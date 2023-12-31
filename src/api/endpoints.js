export const auth = {
    login: '/admin/login',
    reg: '/admin/signup',
    logout: '/admin/logout',
    forgetPassword: '/admin/forgot-password',
    resetPassword: '/admin/reset-password'
}
export const admins = {
    admins: '/admins/',
    category: '/category/',
    banner: '/banner'
}
export const user = {
    getUser: '/users/',
}

export const subscriptionEndpoint = {
    getSubscription: '/admin/plans',
    create: '/admin/create-plan',
    delete: '/admin/delete-plan/',
    edit: '/admin/edit-plan/',
}

export const category = {
    getCategory: '/admin/category',
    createCategory: '/admin/category/create',
    editCategory: '/admin/category/edit/',
    deleteCategory: '/admin/category/delete/',
}

export const landing = {
    getHomePageData: '/admin/landing',
    updateBanner: '/admin/landing/banner',
    updateTrending: '/admin/landing/trending',
}

export const dashboardEndpoint = {
    getDashboardData: '/admin/dashboard/',
    getCategorySelling: '/admin/dashboard/by-category/'
}


export const fileUpload = '/file-upload';