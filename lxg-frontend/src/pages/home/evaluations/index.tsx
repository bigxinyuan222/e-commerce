import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, Input } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { getEvaluationsByProduct, getEvaluationStats, Evaluation } from '@/data/product/evaluations';
import styles from '@/styles/home/evaluations.module.scss';

type FilterType = 'all' | 'good' | 'bad' | 'image';

const ProductEvaluationsPage: React.FC = () => {
  const [, setProductId] = useState<string>('product-1');
  const [evaluations, setEvaluations] = useState<Evaluation[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [currentFilter, setCurrentFilter] = useState<FilterType>('all');
  const [sortType, setSortType] = useState<'newest' | 'helpful'>('newest');
  const [tags, setTags] = useState<{ label: string; count: number }[]>([]);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [currentEvaluation, setCurrentEvaluation] = useState<any>(null);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: '商品评价' });
    
    // 从URL参数获取商品ID
    const id = Taro.getCurrentInstance()?.router?.params?.id || 'product-1';
    setProductId(id);
    
    const evals = getEvaluationsByProduct(id);
    setEvaluations(evals);
    
    const statsData = getEvaluationStats(id);
    const total = evals.length;
    const goodCount = evals.filter(e => e.rating >= 4).length;
    const goodRate = total > 0 ? Math.round((goodCount / total) * 100) : 100;
    
    setStats({
      ...statsData,
      total,
      goodRate
    });
    
    setTags([
      { label: '回头客', count: 68 },
      { label: '音质超nice', count: 234 },
      { label: '续航持久', count: 156 },
      { label: '佩戴舒适', count: 189 },
      { label: '降噪效果好', count: 210 },
      { label: '性价比高', count: 145 }
    ]);
  }, []);

  const filteredEvaluations = evaluations.filter(evalItem => {
    if (currentFilter === 'good') return evalItem.rating >= 4;
    if (currentFilter === 'bad') return evalItem.rating <= 3;
    if (currentFilter === 'image') return evalItem.images.length > 0;
    return true;
  });

  const sortedEvaluations = [...filteredEvaluations].sort((a, b) => {
    if (sortType === 'newest') {
      return new Date(b.createTime).getTime() - new Date(a.createTime).getTime();
    }
    return b.likeCount - a.likeCount;
  });

  const handleLike = (index: number) => {
    const newEvals = [...evaluations];
    const evalIndex = newEvals.findIndex(e => e.id === sortedEvaluations[index].id);
    if (evalIndex !== -1) {
      newEvals[evalIndex].isLike = !newEvals[evalIndex].isLike;
      newEvals[evalIndex].likeCount += newEvals[evalIndex].isLike ? 1 : -1;
      setEvaluations(newEvals);
    }
  };

  const openCommentModal = (evaluation: any) => {
    setCurrentEvaluation(evaluation);
    setShowCommentModal(true);
  };

  const closeCommentModal = () => {
    setShowCommentModal(false);
    setCurrentEvaluation(null);
    setCommentInput('');
  };

  const handleCommentLike = (commentId: string) => {
    if (!currentEvaluation) return;
    
    setEvaluations(prev => {
      return prev.map(evalItem => {
        if (evalItem.id === currentEvaluation.id) {
          return {
            ...evalItem,
            comments: evalItem.comments.map((comment: any) => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  isLike: !comment.isLike,
                  likeCount: comment.isLike ? comment.likeCount - 1 : comment.likeCount + 1
                };
              }
              return comment;
            })
          };
        }
        return evalItem;
      });
    });

    setCurrentEvaluation(prev => ({
      ...prev,
      comments: prev.comments.map((comment: any) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            isLike: !comment.isLike,
            likeCount: comment.isLike ? comment.likeCount - 1 : comment.likeCount + 1
          };
        }
        return comment;
      })
    }));
  };

  const handleSubmitReply = () => {
    if (!currentEvaluation) return;
    
    if (!commentInput.trim()) {
      Taro.showToast({ title: '请输入评论内容', icon: 'none' });
      return;
    }
    
    const newComment = {
      id: `comment-${Date.now()}`,
      evaluationId: currentEvaluation.id,
      userId: 'user-current',
      userName: '我',
      userAvatar: 'https://picsum.photos/id/99/100/100',
      content: commentInput.trim(),
      createTime: new Date().toLocaleString(),
      likeCount: 0,
      isLike: false
    };

    setEvaluations(prev => {
      return prev.map(evalItem => {
        if (evalItem.id === currentEvaluation.id) {
          return {
            ...evalItem,
            comments: [...evalItem.comments, newComment]
          };
        }
        return evalItem;
      });
    });

    setCurrentEvaluation(prev => ({
      ...prev,
      comments: [...prev.comments, newComment]
    }));

    setCommentInput('');
    Taro.showToast({ title: '评论成功', icon: 'success' });
  };

  return (
    <View className={styles.evaluationPage}>
      {/* 筛选标签 */}
      <View className={styles.filterSection}>
        <ScrollView scrollX className={styles.filterTabs}>
          <View 
            className={`${styles.filterTab} ${currentFilter === 'all' ? styles.active : ''}`}
            onClick={() => setCurrentFilter('all')}
          >
            <Text>全部</Text>
            <Text className={styles.filterCount}>{stats?.total || 0}</Text>
          </View>
          <View 
            className={`${styles.filterTab} ${currentFilter === 'good' ? styles.active : ''}`}
            onClick={() => setCurrentFilter('good')}
          >
            <Text>好评</Text>
          </View>
          <View 
            className={`${styles.filterTab} ${currentFilter === 'bad' ? styles.active : ''}`}
            onClick={() => setCurrentFilter('bad')}
          >
            <Text>差评</Text>
          </View>
          <View 
            className={`${styles.filterTab} ${currentFilter === 'image' ? styles.active : ''}`}
            onClick={() => setCurrentFilter('image')}
          >
            <Text>晒图/视频</Text>
            <Text className={styles.filterCount}>{evaluations.filter(e => e.images.length > 0).length}</Text>
          </View>
        </ScrollView>
      </View>

      {/* 评价标签 */}
      <View className={styles.tagSection}>
        <ScrollView scrollX className={styles.tagList}>
          {tags.map((tag, index) => (
            <View key={index} className={styles.tagItem}>
              <Text>{tag.label}</Text>
              <Text className={styles.tagCount}>{tag.count}</Text>
            </View>
          ))}
          <View className={styles.tagMore}>
            <Text>更多</Text>
            <Text className={styles.moreArrow}>›</Text>
          </View>
        </ScrollView>
      </View>

      {/* 排序 */}
      <View className={styles.sortSection}>
        <Text className={styles.sortLabel}>乐享购鼓励真实、有用的评价</Text>
        <View className={styles.sortOptions}>
          <Text 
            className={`${styles.sortOption} ${sortType === 'newest' ? styles.active : ''}`}
            onClick={() => setSortType('newest')}
          >
            最新
          </Text>
          <Text className={styles.sortDivider}>|</Text>
          <Text 
            className={`${styles.sortOption} ${sortType === 'helpful' ? styles.active : ''}`}
            onClick={() => setSortType('helpful')}
          >
            款式
          </Text>
          <Text className={styles.sortArrow}>▼</Text>
        </View>
      </View>

      {/* 评价列表 */}
      <ScrollView scrollY className={styles.evaluationList}>
        {sortedEvaluations.map((evalItem, index) => (
          <View key={evalItem.id} className={styles.evaluationItem}>
            <View className={styles.evalHeader}>
              <Image 
                src={evalItem.userAvatar} 
                className={styles.userAvatar} 
                mode="aspectFill" 
              />
              <View className={styles.userInfo}>
                <View className={styles.userNameRow}>
                  <Text className={styles.userName}>{evalItem.userName}</Text>
                  {index === 0 && <Text className={styles.userTag}>PLUS</Text>}
                </View>
                <Text className={styles.purchaseInfo}>{evalItem.specs}</Text>
              </View>
              <Text className={styles.evalTime}>{evalItem.createTime}</Text>
            </View>
            <Text className={styles.evalContent}>
              {evalItem.content.length > 100 ? evalItem.content.slice(0, 100) + '...' : evalItem.content}
              {evalItem.content.length > 100 && (
                <Text className={styles.expandBtn}>展开</Text>
              )}
            </Text>
            {evalItem.images.length > 0 && (
              <View className={styles.imageGrid}>
                {evalItem.images.map((img, idx) => (
                  <Image 
                    key={idx} 
                    src={img} 
                    className={styles.evalImage} 
                    mode="aspectFill" 
                  />
                ))}
              </View>
            )}
            <View className={styles.evalActions}>
              <View 
                className={`${styles.actionItem} ${evalItem.isLike ? styles.liked : ''}`}
                onClick={() => handleLike(index)}
              >
                <Text className={styles.actionIcon}>{evalItem.isLike ? '❤️' : '👍'}</Text>
                <Text className={styles.actionText}>{evalItem.likeCount}</Text>
              </View>
              <View className={styles.actionItem} onClick={() => openCommentModal(evalItem)}>
                <Text className={styles.actionIcon}>💬</Text>
                <Text className={styles.actionText}>评论</Text>
              </View>
            </View>
          </View>
        ))}
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
              {currentEvaluation.comments && currentEvaluation.comments.length === 0 ? (
                <View className={styles.emptyComment}>
                  <Text>暂无评论，快来发表第一条评论吧~</Text>
                </View>
              ) : (
                <View className={styles.commentList}>
                  {(currentEvaluation.comments || []).map((comment: any) => (
                    <View key={comment.id} className={styles.commentItem}>
                      <Image 
                        src={comment.userAvatar} 
                        className={styles.commentAvatar} 
                        mode="aspectFill" 
                      />
                      <View className={styles.commentContent}>
                        <View className={styles.commentHeader}>
                          <Text className={styles.commentUserName}>{comment.userName}</Text>
                          <Text className={styles.commentTime}>{comment.createTime}</Text>
                        </View>
                        <Text className={styles.commentText}>{comment.content}</Text>
                      </View>
                      <View 
                        className={`${styles.commentLike} ${comment.isLike ? styles.liked : ''}`}
                        onClick={() => handleCommentLike(comment.id)}
                      >
                        <Text>{comment.isLike ? '❤️' : '👍'}</Text>
                        <Text className={styles.commentLikeCount}>{comment.likeCount}</Text>
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
              <View className={styles.commentSendBtn} onClick={handleSubmitReply}>
                <Text>发送</Text>
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ProductEvaluationsPage;