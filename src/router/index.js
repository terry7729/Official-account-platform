import Vue from 'vue'
import Router from 'vue-router'
import Store from '../js/store'

// 注册登录
import Sign from '@/views/Sign'
import SignUp from '@/views/sign/SignUp'
import SignUpUser from '@/views/sign/SignUpUser'
import SignUpType from '@/views/sign/SignUpType'
import SignUpPersonal from '@/views/sign/SignUpPersonal'
import SignUpCompany from '@/views/sign/SignUpCompany'
import SignIn from '@/views/sign/SignIn'

// 首页
import Home from '@/views/Home'
import IndexPage from '@/views/index/IndexPage'

// 自动回复
import AutoResponseAction from '@/views/action/AutoResponseAction'
import KeyWordResponseList from '@/views/action/autoResponse/KeyWordResponseList'
import EditKeyWordResponse from '@/views/action/autoResponse/EditKeyWordResponse'
import GetMessageResponse from '@/views/action/autoResponse/GetMessageResponse'
import BeFocusedResponse from '@/views/action/autoResponse/BeFocusedResponse'

// 自定义菜单
import CustomizeMenuAction from '@/views/action/CustomizeMenuAction'

// 页面模板
import PageTemplateAction from '@/views/action/PageTemplateAction'
import SelectTemplates from '@/views/action/pageTemplate/SelectTemplates'
import PageTemplateList from '@/views/action/pageTemplate/PageTemplateList'

// 粉丝数据
import FansDatasheet from '@/views/datasheet/FansDatasheet'

// 收益广场
import EarningFinance from '@/views/finance/EarningFinance'

// 收益提取
import ExtractFinance from '@/views/finance/ExtractFinance'

// 粉丝管理
import FansManage from '@/views/manage/FansManage'
import Attentioned from '@/views/manage/fans/Attentioned'
import Blacklist from '@/views/manage/fans/Blacklist'

// 轻应用管理
import LightAppManage from '@/views/manage/LightAppManage'

// 素材管理
import MaterialManage from '@/views/manage/MaterialManage'
import ImgTextList from '@/views/manage/materia/ImgTextList'
import EditMaterial from '@/views/manage/materia/EditMaterial'
import ImgList from '@/views/manage/materia/ImgList'
import VideoList from '@/views/manage/materia/VideoList'
import AddVideo from '@/views/manage/materia/AddVideo'

// 消息管理
import MessageManage from '@/views/manage/MessageManage'

// 公众号认证
import AuthenticationSet from '@/views/set/AuthenticationSet'

// 财务设置
import FinancialSet from '@/views/set/FinancialSet'

// 公众号设置
import OfficialAccountSet from '@/views/set/OfficialAccountSet'

// 安全设置
import SecuritySet from '@/views/set/SecuritySet'

// 人员设置
import WorkersSet from '@/views/set/WorkersSet'

// not found
import NotFound from '@/views/NotFound'


Vue.use(Router)

const router = new Router({
    routes: [{
            path: '/',
            name: 'Sign',
            component: Sign,
            redirect: '/SignUp',
            meta: {
                noNeedLogin: true,
            },
            children: [{
                    path: '/SignUp',
                    name: 'SignUp',
                    component: SignUp,
                    redirect: '/SignIn',
                    meta: {
                        noNeedLogin: true,
                    },
                    children: [{
                            path: '/SignUpUser',
                            name: 'SignUpUser',
                            component: SignUpUser,
                            meta: {
                                noNeedLogin: true,
                            },
                        },
                        {
                            path: '/SignUpType',
                            name: 'SignUpType',
                            component: SignUpType,
                            meta: {
                                noNeedLogin: true,
                            },
                            beforeEnter(to, from, next) {
                                if (Store.state.signUpStep === 0) { //注册首页信息未填写不能进入后续页面
                                    next('/SignUpUser')
                                } else {
                                    next()
                                }
                            },
                        },
                        {
                            path: '/SignUpPersonal',
                            name: 'SignUpPersonal',
                            component: SignUpPersonal,
                            meta: {
                                noNeedLogin: true,
                            },
                            beforeEnter(to, from, next) {
                                if (Store.state.signUpStep === 0) { //注册首页信息未填写不能进入后续页面
                                    next('/SignUpUser')
                                } else {
                                    next()
                                }
                            },
                        },
                        {
                            path: '/SignUpCompany',
                            name: 'SignUpCompany',
                            component: SignUpCompany,
                            meta: {
                                noNeedLogin: true,
                            },
                            beforeEnter(to, from, next) {
                                if (Store.state.signUpStep === 0) { //注册首页信息未填写不能进入后续页面
                                    next('/SignUpUser')
                                } else {
                                    next()
                                }
                            },
                        },
                    ]
                },
                {
                    path: '/SignIn',
                    name: 'SignIn',
                    component: SignIn,
                    meta: {
                        noNeedLogin: true,
                    },
                },
            ]
        },
        {
            path: '/Home',
            name: 'Home',
            component: Home,
            redirect: '/IndexPage',
            children: [
                //首页
                {
                    path: '/IndexPage',
                    name: 'IndexPage',
                    component: IndexPage,
                },
                //自动回复
                {
                    path: '/AutoResponseAction',
                    name: 'AutoResponseAction',
                    component: AutoResponseAction,
                    redirect: '/KeyWordResponseList',
                    children: [
                        //关键字回复列表
                        {
                            path: '/KeyWordResponseList',
                            name: 'KeyWordResponseList',
                            component: KeyWordResponseList,
                        },
                        //增加和修改关键字回复
                        {
                            path: '/EditKeyWordResponse',
                            name: 'EditKeyWordResponse',
                            component: EditKeyWordResponse,
                        },
                        //收到消息回复
                        {
                            path: '/GetMessageResponse',
                            name: 'GetMessageResponse',
                            component: GetMessageResponse,
                        },
                        //被关注回复
                        {
                            path: '/BeFocusedResponse',
                            name: 'BeFocusedResponse',
                            component: BeFocusedResponse,
                        },
                    ]
                },
                //自定义菜单
                {
                    path: '/CustomizeMenuAction',
                    name: 'CustomizeMenuAction',
                    component: CustomizeMenuAction,
                },
                //页面模板
                {
                    path: '/PageTemplateAction',
                    name: 'PageTemplateAction',
                    component: PageTemplateAction,
                    redirect: '/PageTemplateList',
                    children: [
                        {
                            path: '/PageTemplateList',
                            name: 'PageTemplateList',
                            component: PageTemplateList,
                        },
                        {
                            path: '/SelectTemplates',
                            name: 'SelectTemplates',
                            component: SelectTemplates,
                        },
                    ]
                },
                //粉丝数据
                {
                    path: '/FansDatasheet',
                    name: 'FansDatasheet',
                    component: FansDatasheet,
                },
                //收益广场
                {
                    path: '/EarningFinance',
                    name: 'EarningFinance',
                    component: EarningFinance,
                },
                //收益提现
                {
                    path: '/ExtractFinance',
                    name: 'ExtractFinance',
                    component: ExtractFinance,
                },
                //粉丝管理
                {
                    path: '/FansManage',
                    name: 'FansManage',
                    component: FansManage,
                    redirect: '/Attentioned',
                    children: [
                        //已关注
                        {
                            path: '/Attentioned',
                            name: 'Attentioned',
                            component: Attentioned,
                        },
                        //黑名单
                        {
                            path: '/Blacklist',
                            name: 'Blacklist',
                            component: Blacklist,
                        },
                    ]
                },
                //轻应用管理
                {
                    path: '/LightAppManage',
                    name: 'LightAppManage',
                    component: LightAppManage,
                },
                //素材管理
                {
                    path: '/MaterialManage',
                    name: 'MaterialManage',
                    component: MaterialManage,
                    redirect: '/ImgTextList',
                    children: [{
                            path: '/ImgTextList',
                            name: 'ImgTextList',
                            component: ImgTextList,
                        },
                        {
                            path: '/EditMaterial',
                            name: 'EditMaterial',
                            component: EditMaterial,
                        },
                        {
                            path: '/ImgList',
                            name: 'ImgList',
                            component: ImgList,
                        },
                        {
                            path: '/VideoList',
                            name: 'VideoList',
                            component: VideoList,
                        },
                        {
                            path: '/AddVideo',
                            name: 'AddVideo',
                            component: AddVideo,
                        },
                    ]
                },
                //消息管理
                {
                    path: '/MessageManage',
                    name: 'MessageManage',
                    component: MessageManage,
                },
                //公众号认证
                {
                    path: '/AuthenticationSet',
                    name: 'AuthenticationSet',
                    component: AuthenticationSet,
                },
                //财务设置
                {
                    path: '/FinancialSet',
                    name: 'FinancialSet',
                    component: FinancialSet,
                },
                //公众号设置
                {
                    path: '/OfficialAccountSet',
                    name: 'OfficialAccountSet',
                    component: OfficialAccountSet,
                },
                //安全中心
                {
                    path: '/SecuritySet',
                    name: 'SecuritySet',
                    component: SecuritySet,
                },
                //人员设置
                {
                    path: '/WorkersSet',
                    name: 'WorkersSet',
                    component: WorkersSet,
                },
            ]
        },
        {
            path: '**',
            component: NotFound,
        }
    ]
})

router.beforeEach((to, from, next) => {
    let Authorization = sessionStorage.getItem('Authorization')
    if (!to.meta.noNeedLogin) {
        if (Authorization) {
            next()
        } else {
            next({
                path: '/SignIn',
                query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else if (to.name === 'SignIn' && Authorization) {
        next({ path: '/Home' })
    } else {
        next()
    }
})


export default router