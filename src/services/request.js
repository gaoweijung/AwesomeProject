


var PathList = {};




PathList.TemprootPath = '';
PathList.ImagePath = 'http://cdn.qcacg.com/';
PathList.ImageBookPath = 'http://cdn.qcacg.com/Controller';
PathList.rootPath = 'https://ex.qcacg.com/Controller';

PathList.netWorks = "https://ex.qcacg.com/mView";

//PathList.rootPath = 'http://116.62.159.44/Controller'; 
//PathList.rootPath = 'http://192.168.0.108:8080/'; 
// 登陆的3个请求
PathList.VerifyLoginServlet = PathList.rootPath + '/login.shtml';
PathList.StartCaptchaServlet = PathList.rootPath + '/StartCaptchaServlet';
PathList.login = PathList.rootPath + '/VerifyLoginServlet.shtml';
// 注册的2个请求
PathList.registerTelephoneCode = PathList.rootPath + '/registerTelephoneCode.shtml';
PathList.register = PathList.rootPath + '/register.shtml';
// 找回密码或修改密码
PathList.updatePasswordTelephoneCode = PathList.rootPath + '/updatePasswordTelephoneCode.shtml';
PathList.updatePassword = PathList.rootPath + '/updatePassword.shtml';


// 查看用户创建作品列表 不需要传数据
PathList.findBookByUser = PathList.rootPath + '/book/findBookByUser.shtml';
// 查看作者创建作品目录页 需要传入作品id
PathList.queryBook = PathList.rootPath + '/book/queryBook.shtml';
// 作者作品新增卷
PathList.saveOrUpdateVolume = PathList.rootPath + '/volume/saveOrUpdateVolume.shtml';
// 作者新建作品上传封面页
PathList.bookUpload = PathList.rootPath + '/book/upload.shtml';
// 作者新建与修改作品的接口
PathList.saveOrUpdateBook = PathList.rootPath + '/book/saveOrUpdateBook.shtml';
// 作者阅读章节接口
PathList.ContentfindContent = PathList.rootPath + '/content/findContent.shtml';
// 作者新建章节接口
PathList.saveOrUpdateContent = PathList.rootPath + '/content/saveOrUpdateContent.shtml';
// 获取作品分类的接口
PathList.queryBookType = PathList.rootPath + '/bookType/queryBookType.shtml';
// 读者访问目录页
PathList.queryBookDirectory = PathList.rootPath + '/catalog/queryBookDirectory.shtml';
//作者其他作品的
PathList.findUserOtherBook = PathList.rootPath + '/catalog/findUserOtherBook.shtml';
//阅读页
PathList.findContent = PathList.rootPath + '/catalog/findContent.shtml';

PathList.queryBookTitle = PathList.rootPath + '/bookType/queryBook.shtml';
// 分类页面
PathList.queryBookClass = PathList.rootPath + '/bookType/filter.shtml';
//主页
PathList.getIndexData = PathList.rootPath + '/index/getIndexData.shtml';
//小编推荐
PathList.nextBatch = PathList.rootPath + '/index/nextBatch.shtml';
//排行榜
PathList.getRankingList = PathList.rootPath + '/rank/getRankingList.shtml';
//我的书架 -我的收藏
PathList.findBookCollectByUser = PathList.rootPath + '/bookCollect/findBookCollectByUser.shtml';
//我的书架-我的浏览记录
PathList.findBookHitByUser = PathList.rootPath + '/bookHit/findBookHitByUser.shtml';
// 判断是否登入
PathList.getStatus = PathList.rootPath + '/getStatus.shtml';
// 添加或取消收藏
PathList.saveOrDeleteBookCollect =  PathList.rootPath + '/bookCollect/saveOrDeleteBookCollect.shtml';
// 获取评论
PathList.findCommentAndReplyByReplyUserId = PathList.rootPath + '/reply/findCommentAndReplyByReplyUserId.shtml';
// 获取个人信息
PathList.queryUser = PathList.rootPath + '/user/queryUser.shtml';
// 修改个人信息
PathList.updateUser = PathList.rootPath + '/user/updateUser.shtml';
// 头像上传
PathList.userUpload = PathList.rootPath + '/user/upload.shtml';
// 获取关注我的 和 我的关注  0表示我关注的人，status 1表示关注我的人  pageNo 当前页码数 pageSize 每页显示的数据量
PathList.myCareOrCareMe = PathList.rootPath + '/relation/myCareOrCareMe.shtml';
// 确定关注 或 取消关注
PathList.saveOrCancelAttention = PathList.rootPath + '/relation/saveOrCancelAttention.shtml';
// 卷交换位置 volumeUpId volumeDownId
PathList.volumeChange = PathList.rootPath + '/catalog/volumeChange.shtml';
// 章节交换位置 contentUpId contentDownId
PathList.contentChange = PathList.rootPath + '/catalog/contentChange.shtml';
// 删除卷
PathList.removeVolume = PathList.rootPath + '/volume/removeVolume.shtml'
// 删除章节
PathList.removeContent = PathList.rootPath + '/content/removeContent.shtml'
// 获取评论
PathList.findCommentAndReply = PathList.rootPath + '/comment/findCommentAndReply.shtml';
// 添加评论
PathList.saveComment = PathList.rootPath + '/comment/saveComment.shtml';
// 获取回复 
PathList.moreReply = PathList.rootPath + '/comment/moreReply.shtml';
// 添加回复    
PathList.saveReply = PathList.rootPath + '/reply/saveReply.shtml';
// 查看回复
PathList.queryMsg = PathList.rootPath + '/info/queryMsg.shtml ';
// 评论置顶
PathList.top = PathList.rootPath + '/comment/top.shtml';
// 新增系统消息
PathList.saveInfo = PathList.rootPath + '/info/saveInfo.shtml';
// 查看消息
PathList.queryMsg = PathList.rootPath + '/info/queryMsg.shtml';
// 获取回复
PathList.findCommentAndReplyByReplyUserId = PathList.rootPath + '/reply/findCommentAndReplyByReplyUserId.shtml';
// 审核
PathList.userUpdateBookStatus = PathList.rootPath + '/book/userUpdateBookStatus.shtml';
// 举报
PathList.report = PathList.rootPath + '/report/report.shtml';
// 钱包余额
PathList.amount = PathList.rootPath + '/pay/amount.shtml';
// 申请签约
PathList.userUpdateBookSign = PathList.rootPath + '/book/userUpdateBookSign.shtml';
// 充值钱包
PathList.recharge = PathList.rootPath + '/pay/recharge.shtml';
// 获取好人卡
PathList.cardamount = PathList.rootPath + '/card/amount.shtml';
// 好人卡记录
PathList.cardlist = PathList.rootPath + '/card/list.shtml';
// 钱包记录
PathList.paylist = PathList.rootPath + '/pay/list.shtml';
// 购买好人卡
PathList.buyCard = PathList.rootPath + '/pay/buyCard.shtml';
// 提现
PathList.withdrawals = PathList.rootPath + '/pay/withdrawals.shtml';
// 保存提现信息登记
PathList.saveAlipay = PathList.rootPath + '/updateAlipay.shtml';
// 打赏好人卡  
PathList.cardgive = PathList.rootPath + '/card/give.shtml';
// 签到获取好人卡   
PathList.cardsign = PathList.rootPath + '/card/sign.shtml';
// 钱包日志详情
PathList.detail_21 = PathList.rootPath + '/log/detailForCash.shtml';
// 退出登录
PathList.logout = PathList.rootPath + '/logout.shtml';
// 回复签约 
PathList.userRegainBookSign = PathList.rootPath + '/book//userRegainBookSign.shtml';
// 历史收入
PathList.totalIncome = PathList.rootPath + '/pay/totalIncome.shtml';
// 记住账号
PathList.remeber = PathList.rootPath + '/remeber.shtml';
// 总收入合计
PathList.orderSum = PathList.rootPath + '/pay/orderSum.shtml';
// 作品好人榜查看更多     
PathList.moreRank = PathList.rootPath + '/card/moreRank.shtml';

PathList.queryBookRank = PathList.rootPath + '/catalog/queryBookRank.shtml';

PathList.collectArticle = PathList.rootPath + '/active/listBook.shtml';
//征文活动获取书籍
PathList.collectSetComment = PathList.rootPath + '/comment/addComment.shtml';
//征文活动添加评论
PathList.collectGetComment = PathList.rootPath + '/comment/listComment.shtml';
//征文活动获得评论
PathList.collectGetReply = PathList.rootPath + '/comment/listReply.shtml';
//征文活动获得回复
PathList.userSignLevelUp = PathList.rootPath + '/book/userSignLevelUp.shtml';
//签约等级提升


/*画师板块的接口  */
// 获取个人画集(创建使用)
PathList.listAlbumForUploadPicture = PathList.rootPath + '/paint/listAlbumForUploadPicture.shtml';
// 获取个人画集列表(非创建使用)  ok
PathList.myselfAlbums = PathList.rootPath + '/paint/myselfAlbums.shtml';
// 删除画集(批量)
PathList.removeAlbums = PathList.rootPath + '/paint/removeAlbums.shtml';

//获取画集详情
PathList.albumDetail = PathList.rootPath + '/paint/albumDetail.shtml';
// 批量删除画作
PathList.removePictures = PathList.rootPath + '/paint/removePictures.shtml';
// 画集审核
PathList.checkAlbum = PathList.rootPath + '/paint/checkAlbum.shtml';
// 获取类型和风格列表
PathList.typeList = PathList.rootPath + '/type/list.shtml';
// 获取画集列表（非创建）
PathList.listAlbumForUploadPicture = PathList.rootPath + '/paint/listAlbumForUploadPicture.shtml';

// 创建画集
PathList.createAlbum = PathList.rootPath + '/paint/createAlbum.shtml';
// 画师上传图片
PathList.upLoadToken = PathList.rootPath + '/paint/upLoadToken.shtml';
// 画师获取图片地址	
PathList.testUrl = PathList.rootPath + '/testUrl.shtml';
// 创建画作	
PathList.savePicture = PathList.rootPath + '/paint/savePicture.shtml';
// 修改画集
PathList.updatePictureDetail = PathList.rootPath + '/paint/updatePictureDetail.shtml';
// 获取单张画作接口
PathList.getPictureDetail = PathList.rootPath + '/paint/getPictureDetail.shtml';

	
PathList.solicitContribution = PathList.rootPath + '/mySpace/solicitContribution.shtml';	
//订单
PathList.listAlbums = PathList.rootPath + '/paint/listAlbums.shtml';
// 查看所有画集

//发起方订单列表
PathList.queryOrderListForUser = PathList.rootPath + '/mySpace/queryOrderListForUser.shtml';
//画师订单列表
PathList.queryOrderListForPainterUser = PathList.rootPath + '/mySpace/queryOrderListForPainterUser.shtml';

//空间
PathList.queryPart = PathList.rootPath +'/mySpace/queryPart.shtml';
//书籍
PathList.queryBookList=PathList.rootPath+'/mySpace/queryBookList.shtml';
//画稿
PathList.queryPaintList=PathList.rootPath+'/mySpace/queryPaintList.shtml';


//点赞
PathList.giveLaud = PathList.rootPath + '/paint/giveLaud.shtml';
//查看一个画集详情页
PathList.albumDetail = PathList.rootPath + '/paint/albumDetail.shtml';
// 订单详情
PathList.queryOneOrder = PathList.rootPath + '/mySpace/queryOneOrder.shtml';
// 画师
PathList.morePainter = PathList.rootPath + '/paint/morePainter.shtml';

// 追加金额
PathList.appendAmount = PathList.rootPath + '/mySpace/appendAmount.shtml';
//  支付定金
PathList.payOrder = PathList.rootPath + '/mySpace/payOrder.shtml';
// 画师同意或者拒绝订单
PathList.painterAcceptedOrRejectOrder = PathList.rootPath + '/mySpace/painterAcceptedOrRejectOrder.shtml' ;
// 确认流程
PathList.orderConfirm = PathList.rootPath + '/mySpace/orderConfirm.shtml' ;
//

PathList.myQueryUser = PathList.rootPath + '/mySpace/queryUser.shtml' ;


PathList.queryAttentionNum = PathList.rootPath + '/mySpace/queryAttentionNum.shtml' ;


// 画作
PathList.listAlbumByFilter = PathList.rootPath + '/paint/listAlbumByFilter.shtml' ;


// 案例上传
PathList.caseFileUpload = PathList.rootPath + '/mySpace/caseFileUpload.shtml' ;
// 画师画集
PathList.painterAlbums = PathList.rootPath + '/paint/painterAlbums.shtml' ;


// 保存公告
PathList.saveNotice = PathList.rootPath + '/mySpace/saveNotice.shtml';



// 个人空间获取评论
PathList.querySpaceCommentList = PathList.rootPath + '/mySpace/querySpaceCommentList.shtml';
// 个人空间获取档案
PathList.queryArchives = PathList.rootPath + '/mySpace/queryArchives.shtml';

// 画集添加评论
PathList.addComment = PathList.rootPath + '/comment/addComment.shtml';
// 分页查看评论
PathList.painterListComment = PathList.rootPath + '/comment/listComment.shtml';
// 分页查看回复
PathList.painterListReply = PathList.rootPath + '/reply/listReply.shtml';
// 画集打赏
PathList.painterGiveCard= PathList.rootPath + '/paint/giveCard.shtml';

//画师接受或拒绝订单
PathList.painterAcceptedOrRejectOrder= PathList.rootPath + '/mySpace/painterAcceptedOrRejectOrder.shtml';

//画师上传草稿
PathList.uploadCaogao = PathList.rootPath + '/mySpace/uploadCaogao.shtml' ;

PathList.uploadXiangao= PathList.rootPath + '/mySpace/uploadXiangao.shtml';

PathList.uploadShangse= PathList.rootPath + '/mySpace/uploadShangse.shtml';

PathList.uploadJiaofu = PathList.rootPath + '/mySpace/uploadJiaofu.shtml' ;
// 流程
PathList.painterUploaMotion = PathList.rootPath + '/mySpace/painterUploaMotion.shtml' ;

// 企划方取消订单
PathList.cancelContribution = PathList.rootPath + '/mySpace/cancelContribution.shtml' ;
// 画师取消订单
PathList.cancelContribution2 = PathList.rootPath + '/mySpace/cancelContribution2.shtml' ;

// 追加时间
PathList.orderOvertime = PathList.rootPath + '/mySpace/orderOvertime.shtml' ;

// 企划方申诉
PathList.saveAppealOrder = PathList.rootPath + '/mySpace/saveAppealOrder.shtml' ;

// 画师申诉
PathList.painterApplyForOrderAppeal = PathList.rootPath + '/mySpace/painterApplyForOrderAppeal.shtml' ;
// 画师同意或拒绝取消企划
PathList.validationOrNotCancelOrder = PathList.rootPath + '/mySpace/validationOrNotCancelOrder.shtml' ;
// 企划方同意或拒绝取消企划
PathList.validationOrNotCancelOrder2 = PathList.rootPath + '/mySpace/validationOrNotCancelOrder2.shtml' ;
//修改画集封面
PathList.upDateAlbumCover = PathList.rootPath + '/paint/updateAlbumCover.shtml';

// 评价订单
PathList.evaluateOrder = PathList.rootPath + '/mySpace/evaluateOrder.shtml' ;
// 添加留言与回复留言
PathList.saveSpaceComment = PathList.rootPath + '/mySpace/saveSpaceComment.shtml' ;
PathList.saveSpaceReply = PathList.rootPath + '/mySpace/saveSpaceReply.shtml' ;

// 是否可以约稿
PathList.queryCanContribution = PathList.rootPath + '/mySpace/queryCanContribution.shtml' ;
// 开启约稿或关闭
PathList.updateCanContribution = PathList.rootPath + '/mySpace/updateCanContribution.shtml' ;

// 企划方支付定金后  画师确认或拒绝
PathList.painterAcceptedOrRejectSolicitContributions = PathList.rootPath + '/mySpace/painterAcceptedOrRejectSolicitContributions.shtml' ;
//发表弹幕
PathList.saveBarrage = PathList.rootPath + '/livingComment/save.shtml' ;
//获取弹幕
PathList.setBarrage = PathList.rootPath + '/livingComment/more.shtml' ;
//获取上传图片 
PathList.carouse = PathList.rootPath + '/carouse/adminList.shtml';
//获取版本号
PathList.version = PathList.rootPath + 'version/latest.shtml';

export default PathList;
