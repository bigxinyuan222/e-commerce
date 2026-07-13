function settingsPage() {
    return `
        <div class="row-stretch">
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-globe"></i> 基础配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">网站名称</label><input type="text" value="乐享购" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">联系方式</label><input type="text" value="400-888-8888" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">网站Logo</label><div style="border:1px dashed #e2e8f0;border-radius:6px;padding:20px;text-align:center;"><i class="fas fa-upload" style="color:#94a3b8;"></i><div style="font-size:12px;color:#94a3b8;margin-top:4px;">点击上传Logo</div></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">备案号</label><input type="text" value="京ICP备12345678号" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div style="grid-column:span 2;"><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">网站描述</label><textarea rows="3" placeholder="请输入网站描述..." style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;">乐享购 - 让购物更快乐</textarea></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-robot"></i> AI 配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">Coze API Key</label><input type="password" placeholder="请输入扣子Coze API Key" style="width:100%;padding:6px 12px;border:1px solid #e2e8f0;border-radius:6px;font-size:13px;" /></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">AI自动回复超时</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="5" style="width:60px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>分钟</span><label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;"><input type="checkbox" checked /> 开启自动回复</label></div></div>
                        </div>
                        <div style="margin-top:12px;padding:10px 14px;background:#fef3c7;border-radius:6px;font-size:12px;color:#92400e;"><i class="fas fa-info-circle"></i> AI配置用于客服自动回复、商品描述生成、评价摘要生成三个智能体功能</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row-stretch">
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-clock"></i> 订单超时配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">待支付订单自动取消时间</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="30" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>分钟</span></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">确认收货自动完成时间</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="15" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>天</span></div></div>
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">售后申请有效期</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="7" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>天</span></div></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-stretch">
                <div class="card" style="flex:1;">
                    <div class="card-header"><span class="card-title"><i class="fas fa-exclamation-triangle"></i> 库存预警配置</span><button class="btn btn-sm btn-primary">保存</button></div>
                    <div class="card-body">
                        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                            <div><label style="display:block;font-size:13px;color:#64748b;margin-bottom:4px;">库存预警阈值</label><div style="display:flex;align-items:center;gap:8px;"><input type="number" value="10" style="width:80px;padding:4px 8px;border:1px solid #e2e8f0;border-radius:4px;text-align:center;" /><span>件</span></div></div>
                            <div style="grid-column:span 2;"><label style="display:flex;align-items:center;gap:4px;font-size:13px;color:#64748b;"><input type="checkbox" checked /> 启用库存预警通知</label></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="card">
            <div class="card-header"><span class="card-title"><i class="fas fa-file-alt"></i> 操作日志</span></div>
            <div class="card-body no-pad"><div class="table-wrap"><table>
                <thead><tr><th>操作人</th><th>操作模块</th><th>操作内容</th><th>IP地址</th><th>操作类型</th><th>时间</th></tr></thead>
                <tbody>
                    <tr><td>admin</td><td>商品管理</td><td>上架商品：无线蓝牙耳机 Pro</td><td>192.168.1.100</td><td><span class="tag primary">新增</span></td><td>2026-06-24 14:20</td></tr>
                    <tr><td>goods_op</td><td>库存管理</td><td>调整库存 SKU-001 +200</td><td>192.168.1.101</td><td><span class="tag">修改</span></td><td>2026-06-24 11:10</td></tr>
                    <tr><td>admin</td><td>订单管理</td><td>取消订单 ORD-20260623-005</td><td>192.168.1.100</td><td><span class="tag" style="background:#fee2e2;color:#dc2626;">删除</span></td><td>2026-06-24 09:30</td></tr>
                    <tr><td>service_op</td><td>客服管理</td><td>回复用户咨询 #1234</td><td>192.168.1.102</td><td><span class="tag">修改</span></td><td>2026-06-24 08:45</td></tr>
                    <tr><td>admin</td><td>系统设置</td><td>更新网站配置</td><td>192.168.1.100</td><td><span class="tag">修改</span></td><td>2026-06-23 16:30</td></tr>
                    <tr><td>marketing_op</td><td>营销活动</td><td>创建优惠券活动</td><td>192.168.1.103</td><td><span class="tag primary">新增</span></td><td>2026-06-23 14:00</td></tr>
                </tbody>
            </table></div></div>
        </div>
    `;
}