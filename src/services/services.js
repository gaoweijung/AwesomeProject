const appPathList = {};


appPathList.TemprootPath = '';

appPathList.rootPath = 'https://ex.qcacg.com/Controller';

appPathList.ImageBookPath = 'http://cdn.qcacg.com/Controller';

appPathList.netWorks = 'https://ex.qcacg.com/mView';

appPathList.imagePath = 'http://cdn.qcacg.com/Controller';
// 登陆的3个请求
appPathList.VerifyLoginServlet = `${appPathList.rootPath}/login.shtml`;
appPathList.StartCaptchaServlet = `${appPathList.rootPath}/StartCaptchaServlet`;
// appPathList.login = appPathList.rootPath + '/VerifyLoginServlet.shtml';
// 登录
appPathList.login = `${appPathList.rootPath}/mobilelogin.shtml`;
// 获取验证码图片
appPathList.vertify = `${appPathList.rootPath}mobilelogincode.shtml`;
// 退出登录
appPathList.loginOut = `${appPathList.rootPath}mobilelogout.shtml`;

// 注册的2个请求
// appPathList.registerTelephoneCode = appPathList.rootPath + '/registerTelephoneCode.shtml';
// appPathList.register = appPathList.rootPath + '/register.shtml';
// 获取图片验证码
appPathList.registerPicCode = `${appPathList.rootPath}/mobileRegisterCode.shtml`;
// 获取短信验证码
appPathList.registerCheckCode = `${appPathList.rootPath}/registerMobileCode.shtml`;
// 注册
appPathList.register = `${appPathList.rootPath}/mobileregister.shtml`;
// 找回密码或修改密码
appPathList.updatePasswordTelephoneCode = `${appPathList.rootPath}/updatePasswordTelephoneCode.shtml`;
appPathList.updatePassword = `${appPathList.rootPath}/updatePassword.shtml`;
// 忘记密码
appPathList.newMobileTelephoneCode = `${appPathList.rootPath}/newMobileTelephoneCode.shtml`;

appPathList.userUpdateBookSign = `${appPathList.rootPath}/book/userUpdateBookSign.shtml`;
// 签约等级提升
appPathList.userSignLevelUp = `${appPathList.rootPath}/book/userSignLevelUp.shtml`;

// 查看用户创建作品列表 不需要传数据
appPathList.findBookByUser = `${appPathList.rootPath}/book/findBookByUser.shtml`;
// 查看作者创建作品目录页 需要传入作品id
appPathList.queryBook = `${appPathList.rootPath}/book/queryBook.shtml`;
// 作者作品新增卷
appPathList.saveOrUpdateVolume = `${appPathList.rootPath}/volume/saveOrUpdateVolume.shtml`;
// 作者新建作品上传封面页
appPathList.bookUpload = `${appPathList.rootPath}/book/upload.shtml`;
// 作者新建与修改作品的接口
appPathList.saveOrUpdateBook = `${appPathList.rootPath}/book/saveOrUpdateBook.shtml`;
// 作者阅读章节接口
appPathList.ContentfindContent = `${appPathList.rootPath}/content/findContent.shtml`;
// 作者新建章节接口
appPathList.saveOrUpdateContent = `${appPathList.rootPath}/content/saveOrUpdateContent.shtml`;
// 获取作品分类的接口
appPathList.queryBookType = `${appPathList.rootPath}/bookType/queryBookType.shtml`;
// 读者访问目录页
appPathList.queryBookDirectory = `${appPathList.rootPath}/catalog/queryBookDirectory.shtml`;
// 作者其他作品的
appPathList.findUserOtherBook = `${appPathList.rootPath}/catalog/findUserOtherBook.shtml`;
// 阅读页
appPathList.findContent = `${appPathList.rootPath}/catalog/findContent.shtml`;

appPathList.queryBookTitle = `${appPathList.rootPath}/bookType/queryBook.shtml`;
// 分类页面
appPathList.queryBookClass = `${appPathList.rootPath}/bookType/filter.shtml`;
// 主页
appPathList.getIndexData = `${appPathList.rootPath}/index/getIndexData.shtml`;
// 小编推荐
appPathList.nextBatch = `${appPathList.rootPath}/index/nextBatch.shtml`;
// 排行榜
appPathList.getRankingList = `${appPathList.rootPath}/rank/getRankingList.shtml`;
// 我的书架 -我的收藏
appPathList.findBookCollectByUser = `${appPathList.rootPath}/bookCollect/findBookCollectByUser.shtml`;
// 我的书架-我的浏览记录
appPathList.findBookHitByUser = `${appPathList.rootPath}/bookHit/findBookHitByUser.shtml`;
// 判断是否登入
appPathList.getStatus = `${appPathList.rootPath}/getStatus.shtml`;
// 添加或取消收藏
appPathList.saveOrDeleteBookCollect = `${appPathList.rootPath}/bookCollect/saveOrDeleteBookCollect.shtml`;
// 获取评论
appPathList.findCommentAndReplyByReplyUserId = `${appPathList.rootPath}/reply/findCommentAndReplyByReplyUserId.shtml`;
// 获取个人信息
appPathList.queryUser = `${appPathList.rootPath}/user/queryUser.shtml`;
// 修改个人信息
appPathList.updateUser = `${appPathList.rootPath}/user/updateUser.shtml`;
// 头像上传
appPathList.userUpload = `${appPathList.rootPath}/user/upload.shtml`;
// 获取关注我的 和 我的关注  0表示我关注的人，status 1表示关注我的人  pageNo 当前页码数 pageSize 每页显示的数据量
appPathList.myCareOrCareMe = `${appPathList.rootPath}/relation/myCareOrCareMe.shtml`;
// 确定关注 或 取消关注
appPathList.saveOrCancelAttention = `${appPathList.rootPath}/relation/saveOrCancelAttention.shtml`;
// 卷交换位置 volumeUpId volumeDownId
appPathList.volumeChange = `${appPathList.rootPath}/catalog/volumeChange.shtml`;
// 章节交换位置 contentUpId contentDownId
appPathList.contentChange = `${appPathList.rootPath}/catalog/contentChange.shtml`;
// 删除卷
appPathList.removeVolume = `${appPathList.rootPath}/volume/removeVolume.shtml`;
// 删除章节
appPathList.removeContent = `${appPathList.rootPath}/content/removeContent.shtml`;
// 获取评论
appPathList.findCommentAndReply = `${appPathList.rootPath}/comment/findCommentAndReply.shtml`;
// 添加评论
appPathList.saveComment = `${appPathList.rootPath}/comment/saveComment.shtml`;
// 获取回复
appPathList.moreReply = `${appPathList.rootPath}/comment/moreReply.shtml`;
// 添加回复
appPathList.saveReply = `${appPathList.rootPath}/reply/saveReply.shtml`;
// 查看回复
appPathList.queryMsg = `${appPathList.rootPath}/info/queryMsg.shtml `;
// 评论置顶
appPathList.top = `${appPathList.rootPath}/comment/top.shtml`;
// 新增系统消息
appPathList.saveInfo = `${appPathList.rootPath}/info/saveInfo.shtml`;
// 查看消息
appPathList.queryMsg = `${appPathList.rootPath}/info/queryMsg.shtml`;
// 获取回复
appPathList.findCommentAndReplyByReplyUserId = `${appPathList.rootPath}/reply/findCommentAndReplyByReplyUserId.shtml`;
// 审核
appPathList.userUpdateBookStatus = `${appPathList.rootPath}/book/userUpdateBookStatus.shtml`;
// 举报
appPathList.report = `${appPathList.rootPath}/report/report.shtml`;
// 钱包余额
appPathList.amount = `${appPathList.rootPath}/pay/amount.shtml`;
// 申请签约
appPathList.userUpdateBookSign = `${appPathList.rootPath}/book/userUpdateBookSign.shtml`;
// 充值钱包
appPathList.newRecharge = `${appPathList.rootPath}/pay/newRecharge.shtml`;
// 获取好人卡
appPathList.cardamount = `${appPathList.rootPath}/card/amount.shtml`;
// 好人卡记录
appPathList.cardlist = `${appPathList.rootPath}/card/list.shtml`;
// 钱包记录
appPathList.paylist = `${appPathList.rootPath}/pay/list.shtml`;
// 购买好人卡
appPathList.buyCard = `${appPathList.rootPath}/pay/buyCard.shtml`;
// 提现
appPathList.withdrawals = `${appPathList.rootPath}/pay/withdrawals.shtml`;
// 保存提现信息登记
appPathList.saveAlipay = `${appPathList.rootPath}/updateAlipay.shtml`;
// 打赏好人卡
appPathList.cardgive = `${appPathList.rootPath}/card/give.shtml`;
// 签到获取好人卡
appPathList.cardsign = `${appPathList.rootPath}/card/sign.shtml`;
// 钱包日志详情
appPathList.detail_21 = `${appPathList.rootPath}/log/detailForCash.shtml`;
// 退出登录
appPathList.logout = `${appPathList.rootPath}/logout.shtml`;
// 回复签约
appPathList.userRegainBookSign = `${appPathList.rootPath}/book//userRegainBookSign.shtml`;
// 历史收入
appPathList.totalIncome = `${appPathList.rootPath}/pay/totalIncome.shtml`;
// 记住账号
appPathList.remeber = `${appPathList.rootPath}/remeber.shtml`;
// 总收入合计
appPathList.orderSum = `${appPathList.rootPath}/pay/orderSum.shtml`;
// 作品好人榜查看更多
appPathList.moreRank = `${appPathList.rootPath}/card/moreRank.shtml`;

appPathList.queryBookRank = `${appPathList.rootPath}/catalog/queryBookRank.shtml`;

appPathList.collectArticle = `${appPathList.rootPath}/active/listBook.shtml`;
// 征文活动获取书籍
appPathList.collectSetComment = `${appPathList.rootPath}/comment/addComment.shtml`;
// 征文活动添加评论
appPathList.collectGetComment = `${appPathList.rootPath}/comment/listComment.shtml`;
// 征文活动获得评论
appPathList.collectGetReply = `${appPathList.rootPath}/comment/listReply.shtml`;
// 征文活动获得回复
appPathList.lastUpdate = `${appPathList.rootPath}/index/lastUpdate.shtml`;

appPathList.code = `${appPathList.rootPath}/code.shtml`;
// 图形验证码
appPathList.mobileTelephoneCode = `${appPathList.rootPath}/mobileTelephoneCode.shtml`;
// 图片检查
appPathList.nextNew = `${appPathList.rootPath}/index/nextNew.shtml`;
// 获取搜索热门标签
appPathList.keyWord = `${appPathList.rootPath}/bookType/keywords.shtml`;
// 根据评论获取所有回复
appPathList.findCommentAndReplyByOneLever = `${appPathList.rootPath}/comment/findCommentAndReplyByOneLever.shtml`;
// 批量取消收藏
appPathList.removeBookCollects = `${appPathList.rootPath}/bookCollect/removeBookCollects.shtml`;
// 批量取消浏览记录
appPathList.removeBookHits = `${appPathList.rootPath}/bookHit/removeBookHits.shtml`;
// 评论详情
appPathList.acquireComment = `${appPathList.rootPath}/comment/acquireComment.shtml`;

// 关心和粉丝，书籍数及画集数
appPathList.allUserInfo = `${appPathList.rootPath}/user/countPrivateAmountInfo.shtml`;
// ios支付回调
appPathList.iosIap = `${appPathList.rootPath}/iap/setIapCertificate.shtml`;
// app 获得小编推荐,全站推荐,新书推荐
appPathList.mobileIndexData = `${appPathList.rootPath}/index/mobileIndexData.shtml`;
// app 获得小编推荐
appPathList.mobileEditorRecommendedData = `${appPathList.rootPath}/index/mobileEditorRecommendedData.shtml`;
// app 全站推荐
appPathList.mobileAllRecommendedData = `${appPathList.rootPath}/index/mobileAllRecommendedData.shtml`;
// app 新书推荐
appPathList.mobileNewRecommendedData = `${appPathList.rootPath}/index/mobileNewRecommendedData.shtml`;
// 微信
appPathList.paystart = `${appPathList.rootPath}/wxpay/paystart.shtml`;
// 空间
appPathList.queryPart = `${appPathList.rootPath}/mySpace/queryPart.shtml`;
// 管理轮播
appPathList.carousel = `${appPathList.rootPath}/carousel/adminList.shtml`;
// 游客登录
appPathList.customerLogin = `${appPathList.rootPath}/customerLogin.shtml`;
// 获取版本号
appPathList.version = `${appPathList.rootPath}version/latest.shtml`;
export default appPathList;
