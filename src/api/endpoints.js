export const auth = {
    login: '/admin/login',
    reg: '/admin/signup',
    logout: '/admin/logout',
    forgetPassword: '/admin/forget-password',
    resetPassword: '/admin/reset-password'
}
export const admins = {
    getAdmins: '/admins',
}
export const user = {
    getUser: '/users/',
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