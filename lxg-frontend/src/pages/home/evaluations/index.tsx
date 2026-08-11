import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import {
  fetchReviewList,
  fetchReviewStats,
  fetchReviewAiSummary,
  likeReview,
  replyToReview,
  fetchReviewReplies,
} from '@/api/home';
import { getImageUrl, lazyImgProps } from '@/utils/image';
import { formatDateTime } from '@/utils/time';
import styles from '@/styles/home/evaluations.module.scss';

type FilterType = 'all' | 'good' | 'neutral' | 'bad' | 'image';

const ProductEvaluationsPage: React.FC = () => {
  const [productId, setProductId] = useState<string>('');
  const [evaluations, setEvaluations] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState<any>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<'newest' | 'helpful'>('newest');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [commentInput, setCommentInput] = useState('');
  const [submittingReply, setSubmittingReply] = useState(false);

  const pageSize = 10;

  // 加载评价列表
  const loadReviews = useCallback(async (pId: string, filter: FilterType, pageNum: number = 1, append: boolean = false) => {
    if (!pId) return;
    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    try {
      const res = await fetchReviewList({
        productId: pId,
        page: pageNum,
        size: pageSize,
        type: filter,
      });
      const list = Array.isArray(res?.data) ? res.data : [];
      if (append) {
        setEvaluations(prev => [...prev, ...list]);
      } else {
        setEvaluations(list);
      }
      setHasMore(list.length >= pageSize);
      setPage(pageNum);
    } catch (error: any) {
      console.error('[评价列表] 加载失败:', error?.message || error);
      if (!append) setEvaluations([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // 加载评价统计
  const loadStats = useCallback(async (pId: string) => {
    if (!pId) return;
    try {
      const res = await fetchReviewStats(pId);
      if (res?.data) {
        setStats(res.data);
      }
    } catch (error: any) {
      console.error('[评价统计] 加载失败:', error?.message || error);
    }
  }, []);

  // 加载AI评价摘要（即使 content 为空也保留，由 UI 显示占位框架）
  const [aiLoading, setAiLoading] = useState(true);
  const loadAiSummary = useCallback(async (pId: string) => {
    if (!pId) return;
    setAiLoading(true);
    try {
      const res = await fetchReviewAiSummary(pId);
      if (res?.data) {
        setAiSummary(res.data);
      }
    } catch (error: any) {
      console.error('[AI评价摘要] 加载失败:', error?.message || error);
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '商品评价' });
    const id = Taro.getCurrentInstance()?.router?.params?.id || '';
    if (!id) {
      Taro.showToast({ title: '缺少商品ID', icon: 'none' });
      setLoading(false);
      return;
    }
    setProductId(id);
    // 并行加载评价列表、统计、AI摘要
    loadReviews(id, 'all', 1, false);
    loadStats(id);
    loadAiSummary(id);
  }, []);

  // 筛选切换
  const handleFilterChange = useCallback((filter: FilterType) => {
    setCurrentFilter(filter);
    if (productId) {
      loadReviews(productId, filter, 1, false);
    }
  }, [productId, loadReviews]);

  // 加载更多
  const handleLoadMore = useCallback(() => {
    if (loadingMore || !hasMore || !productId) return;
    loadReviews(productId, currentFilter, page + 1, true);
  }, [loadingMore, hasMore, productId, page, currentFilter, loadReviews]);

  // 排序
  const sortedEvaluations = React.useMemo(() => {
    const sorted = [...evaluations];
    if (sortType === 'newest') {
      return sorted.sort((a, b) => {
        const ta = new Date(String(a.createdAt || a.createTime || '').replace(/-/g, '/')).getTime() || 0;
        const tb = new Date(String(b.createdAt || b.createTime || '').replace(/-/g, '/')).getTime() || 0;
        return tb - ta;
      });
    }
    return sorted.sort((a, b) => (b.likeCount || 0) - (a.likeCount || 0));
  }, [evaluations, sortType]);

  // 点赞
  const handleLike = useCallback(async (evalId: string) => {
    if (!evalId) return;
    // 乐观更新
    setEvaluations(prev => prev.map(item => {
      if (item.id === evalId) {
        return {
          ...item,
          isLike: !item.isLike,
          likeCount: item.isLike ? (item.likeCount || 0) - 1 : (item.likeCount || 0) + 1,
        };
      }
      return item;
    }));
    try {
      await likeReview(evalId);
    } catch (error) {
      console.error('Failed to like review:', error);
      // 回滚
      setEvaluations(prev => prev.map(item => {
        if (item.id === evalId) {
          return {
            ...item,
            isLike: !item.isLike,
            likeCount: item.isLike ? (item.likeCount || 0) - 1 : (item.likeCount || 0) + 1,
          };
        }
        return item;
      }));
      Taro.showToast({ title: '点赞失败', icon: 'none' });
    }
  }, []);

  // 打开评论弹窗 - 加载回复列表
  const openCommentModal = useCallback(async (evaluation: any) => {
    setCurrentEvaluation({ ...evaluation, comments: [], loadingReplies: true });
    setShowCommentModal(true);
    try {
      const res = await fetchReviewReplies({ reviewId: evaluation.id, page: 1, size: 50 });
      const replies = Array.isArray(res?.data) ? res.data : [];
      setCurrentEvaluation(prev => prev ? { ...prev, comments: replies, loadingReplies: false } : prev);
    } catch (error) {
      console.error('Failed to load review replies:', error);
      setCurrentEvaluation(prev => prev ? { ...prev, comments: [], loadingReplies: false } : prev);
    }
  }, []);

  const closeCommentModal = useCallback(() => {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  }, []);

  // 提交回复
  const handleSubmitReply = useCallback(async () => {
    if (!commentInput.trim()) {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }
    if (!currentEvaluation?.id) {
      Taro.showToast({ title: '评价信息异常', icon: 'none' });
      return;
    }
    if (submittingReply) return;

    setSubmittingReply(true);
    try {
      await replyToReview({
        reviewId: currentEvaluation.id,
        content: commentInput.trim(),
      });

      const newComment = {
        id: `comment-${Date.now()}`,
        reviewId: currentEvaluation.id,
        userId: 'user-current',
        userName: '我',
        userAvatar: '',
        content: commentInput.trim(),
        createdAt: new Date().toLocaleString(),
        likeCount: 0,
        isLike: false,
      };

      setCurrentEvaluation(prev => prev ? {
        ...prev,
        comments: [...(prev.comments || []), newComment],
      } : prev);

      setCommentInput('');
      Taro.showToast({ title: '评论成功', icon: 'success' });
    } catch (error: any) {
      console.error('Failed to send reply:', error);
      Taro.showToast({ title: error?.message || '评论失败', icon: 'none' });
    } finally {
      setSubmittingReply(false);
    }
  }, [commentInput, currentEvaluation, submittingReply]);

  // 渲染评分分布
  return (
    <View className={styles.evaluationPage}>
      {/* AI智能总评卡片：始终显示框架，加载中/无内容时展示占位 */}
      <View style={{
        position: 'relative',
        margin: '20rpx',
        padding: '32rpx 28rpx 28rpx',
        borderRadius: '24rpx',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #1a1f3a 0%, #2d1b69 45%, #4a2c7a 100%)',
        boxShadow: '0 8rpx 28rpx rgba(74, 44, 122, 0.35)',
        color: '#fff',
      }}>
        <View style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', marginBottom: '24rpx' }}>
          <View style={{
            width: '64rpx', height: '64rpx', borderRadius: '999rpx',
            background: 'linear-gradient(135deg, #a88bff 0%, #6c5ce7 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginRight: '16rpx',
            boxShadow: '0 4rpx 12rpx rgba(168, 139, 255, 0.5)',
          }}>
            <Text style={{ fontSize: '36rpx', lineHeight: 1 }}>🤖</Text>
          </View>
          <Text style={{ flex: 1, fontSize: '34rpx', fontWeight: '700', color: '#fff', letterSpacing: '1rpx' }}>
            AI智能总评
          </Text>
          <Text style={{
            fontSize: '20rpx', color: '#c8b6ff',
            background: 'rgba(168, 139, 255, 0.15)',
            border: '1rpx solid rgba(168, 139, 255, 0.3)',
            padding: '4rpx 14rpx', borderRadius: '999rpx', marginLeft: '12rpx',
          }}>AI</Text>
          {aiSummary && aiSummary.averageRating > 0 && (
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginLeft: '12rpx' }}>
              <Text style={{ fontSize: '44rpx', fontWeight: '700', color: '#ffd700', lineHeight: 1 }}>
                {Math.round(aiSummary.averageRating * 20)}%
              </Text>
              <Text style={{ fontSize: '20rpx', color: 'rgba(255,255,255,0.65)', marginTop: '6rpx' }}>综合评分</Text>
            </View>
          )}
        </View>

        {/* 加载中 / 无内容占位 */}
        {(aiLoading || (aiSummary && !aiSummary.overall)) && (
          <View style={{
            position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center',
            padding: '28rpx 24rpx', marginBottom: '20rpx',
            background: 'rgba(255,255,255,0.06)', borderRadius: '16rpx',
            borderLeft: '4rpx solid rgba(168,139,255,0.5)',
          }}>
            <View style={{ display: 'flex', marginRight: '16rpx' }}>
              <Text style={{ width: '12rpx', height: '12rpx', borderRadius: '999rpx', background: '#a88bff', marginRight: '8rpx', opacity: 0.4 }}> </Text>
              <Text style={{ width: '12rpx', height: '12rpx', borderRadius: '999rpx', background: '#a88bff', marginRight: '8rpx', opacity: 0.7 }}> </Text>
              <Text style={{ width: '12rpx', height: '12rpx', borderRadius: '999rpx', background: '#a88bff', opacity: 1 }}> </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: '30rpx', color: 'rgba(255,255,255,0.75)' }}>
                AI 正在分析该商品的评价...
              </Text>
              <Text style={{ display: 'block', fontSize: '22rpx', color: 'rgba(255,255,255,0.45)', marginTop: '6rpx' }}>
                {aiLoading ? '基于真实用户评价智能生成' : '评价数据积累后将自动生成总评'}
              </Text>
            </View>
          </View>
        )}

        {/* 有 AI 总评内容 */}
        {!aiLoading && aiSummary && aiSummary.overall && (
          <>
            <Text style={{
              position: 'relative', zIndex: 1, display: 'block',
              fontSize: '30rpx', color: 'rgba(255,255,255,0.92)', lineHeight: 1.7,
              marginBottom: '24rpx', padding: '20rpx 24rpx',
              background: 'rgba(255,255,255,0.06)', borderRadius: '16rpx',
              borderLeft: '4rpx solid #a88bff',
            }}>
              {aiSummary.overall}
            </Text>
            {aiSummary.strengths && aiSummary.strengths.length > 0 && (
              <View style={{ position: 'relative', zIndex: 1, marginBottom: '16rpx' }}>
                <Text style={{ fontSize: '28rpx', color: 'rgba(255,255,255,0.85)', marginBottom: '12rpx', fontWeight: '500' }}>
                  👍 好评亮点
                </Text>
                <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {aiSummary.strengths.map((tag: string, idx: number) => (
                    <Text key={idx} style={{
                      fontSize: '28rpx', color: '#b9f5d4',
                      background: 'rgba(72, 209, 104, 0.18)',
                      border: '1rpx solid rgba(72, 209, 104, 0.35)',
                      padding: '8rpx 20rpx', borderRadius: '999rpx',
                      marginRight: '12rpx', marginBottom: '12rpx',
                    }}>{tag}</Text>
                  ))}
                </View>
              </View>
            )}
            {aiSummary.weaknesses && aiSummary.weaknesses.length > 0 && (
              <View style={{ position: 'relative', zIndex: 1 }}>
                <Text style={{ fontSize: '28rpx', color: 'rgba(255,255,255,0.85)', marginBottom: '12rpx', fontWeight: '500' }}>
                  👎 待改进
                </Text>
                <View style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {aiSummary.weaknesses.map((tag: string, idx: number) => (
                    <Text key={idx} style={{
                      fontSize: '28rpx', color: '#ffd3a0',
                      background: 'rgba(255, 159, 67, 0.18)',
                      border: '1rpx solid rgba(255, 159, 67, 0.35)',
                      padding: '8rpx 20rpx', borderRadius: '999rpx',
                      marginRight: '12rpx', marginBottom: '12rpx',
                    }}>{tag}</Text>
                  ))}
                </View>
              </View>
            )}
          </>
        )}
      </View>

      {/* 筛选标签 */}
      <View className={styles.filterSection}>
        <ScrollView scrollX className={styles.filterTabs}>
          <View
            className={`${styles.filterTab} ${currentFilter === 'all' ? styles.active : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            <Text>全部 {stats?.total || ''}</Text>
          </View>
          <View
            className={`${styles.filterTab} ${currentFilter === 'good' ? styles.active : ''}`}
            onClick={() => handleFilterChange('good')}
          >
            <Text>好评 {stats?.goodCount || ''}</Text>
          </View>
          <View
            className={`${styles.filterTab} ${currentFilter === 'bad' ? styles.active : ''}`}
            onClick={() => handleFilterChange('bad')}
          >
            <Text>差评 {stats?.badCount || ''}</Text>
          </View>
        </ScrollView>
      </View>

      {/* 评价列表 */}
      <ScrollView
        scrollY
        className={styles.evaluationList}
        onScrollToLower={handleLoadMore}
        style={{ height: 'calc(100vh - 400rpx)' }}
      >
        {loading ? (
          <View style={{ padding: '100rpx', textAlign: 'center' }}>
            <Text style={{ color: '#999' }}>加载中...</Text>
          </View>
        ) : sortedEvaluations.length === 0 ? (
          <View style={{ padding: '100rpx', textAlign: 'center' }}>
            <Text style={{ color: '#999' }}>暂无评价，快来发表第一条评价吧~</Text>
          </View>
        ) : (
          <>
            {sortedEvaluations.map((evalItem, index) => (
              <View key={evalItem.id || index} className={styles.evaluationItem}>
                <View className={styles.evalHeader}>
                  <Image
                    src={getImageUrl(evalItem.userAvatar)}
                    className={styles.userAvatar}
                    mode="aspectFill"
                    {...lazyImgProps()}
                  />
                  <View className={styles.userInfo}>
                    <View className={styles.userNameRow}>
                      <Text className={styles.userName}>{evalItem.userName || '匿名用户'}</Text>
                      {index === 0 && <Text className={styles.userTag}>PLUS</Text>}
                    </View>
                    <Text className={styles.purchaseInfo}>{evalItem.specs || evalItem.skuName || ''}</Text>
                  </View>
                  <Text className={styles.evalTime}>{formatDateTime(evalItem.createdAt || evalItem.createTime || '')}</Text>
                </View>
                <View className={styles.ratingRow}>
                  <Text className={styles.ratingLabel}>好评</Text>
                </View>
                <Text className={styles.evalContent}>
                  {evalItem.content && evalItem.content.length > 200
                    ? evalItem.content.slice(0, 200) + '...'
                    : evalItem.content}
                </Text>
                {evalItem.images && evalItem.images.length > 0 && (
                  <View className={styles.imageGrid}>
                    {evalItem.images.map((img: string, idx: number) => (
                      <Image
                        key={idx}
                        src={getImageUrl(img)}
                        className={styles.evalImage}
                        mode="aspectFill"
                        {...lazyImgProps()}
                      />
                    ))}
                  </View>
                )}
                <View className={styles.evalActions}>
                  <View
                    className={`${styles.actionItem} ${evalItem.isLike ? styles.liked : ''}`}
                    onClick={() => handleLike(evalItem.id)}
                  >
                    <Text className={styles.actionIcon}>{evalItem.isLike ? '❤️' : '👍'}</Text>
                    <Text className={styles.actionText}>{evalItem.likeCount || 0}</Text>
                  </View>
                  <View className={styles.actionItem} onClick={() => openCommentModal(evalItem)}>
                    <Text className={styles.actionIcon}>💬</Text>
                    <Text className={styles.actionText}>{evalItem.replyCount || (evalItem.comments && evalItem.comments.length) || 0}</Text>
                  </View>
                </View>
              </View>
            ))}
            {loadingMore && (
              <View style={{ padding: '30rpx', textAlign: 'center' }}>
                <Text style={{ color: '#999', fontSize: '24rpx' }}>加载更多...</Text>
              </View>
            )}
            {!hasMore && sortedEvaluations.length > 0 && (
              <View style={{ padding: '30rpx', textAlign: 'center' }}>
                <Text style={{ color: '#999', fontSize: '24rpx' }}>没有更多评价了</Text>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {showCommentModal && currentEvaluation && (
        <View className={styles.commentModal}>
          <View className={styles.modalMask} onClick={closeCommentModal} />
          <View className={styles.commentModalContent}>
            <View className={styles.commentModalHeader}>
              <Text className={styles.commentModalTitle}>全部讨论</Text>
              <View className={styles.commentModalClose} onClick={closeCommentModal}>
                <Text>×</Text>
              </View>
            </View>
            <ScrollView scrollY className={styles.commentModalBody}>
              {currentEvaluation.loadingReplies ? (
                <View className={styles.emptyComment}>
                  <Text>加载中...</Text>
                </View>
              ) : (!currentEvaluation.comments || currentEvaluation.comments.length === 0) ? (
                <View className={styles.emptyComment}>
                  <Text>暂无评论，快来发表第一条评论吧~</Text>
                </View>
              ) : (
                <View className={styles.commentList}>
                  {(currentEvaluation.comments || []).map((comment: any) => (
                    <View key={comment.id} className={styles.commentItem}>
                      <Image
                        src={getImageUrl(comment.userAvatar)}
                        className={styles.commentAvatar}
                        mode="aspectFill"
                        {...lazyImgProps()}
                      />
                      <View className={styles.commentContent}>
                        <View className={styles.commentHeader}>
                          <Text className={styles.commentUserName}>{comment.userName || '匿名用户'}</Text>
                          <Text className={styles.commentTime}>{formatDateTime(comment.createdAt || comment.createTime || '')}</Text>
                        </View>
                        <Text className={styles.commentText}>{comment.content}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
            <View className={styles.commentModalFooter}>
              <Input
                className={styles.commentInput}
                placeholder="写下你的评论..."
                value={commentInput}
                onInput={(e: any) => setCommentInput(e.detail.value)}
                onConfirm={handleSubmitReply}
              />
              <View
                className={styles.commentSendBtn}
                onClick={handleSubmitReply}
                style={submittingReply ? { opacity: 0.6 } : {}}
              >
                <Text>{submittingReply ? '发送中' : '发送'}</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductEvaluationsPage;
