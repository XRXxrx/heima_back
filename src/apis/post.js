import myaxios from '@/utils/request'

export const getPostList = (params) => {
    return myaxios({
        method: 'get',
        url: '/post_search',
        params
    })
}

//栏目数据
export const getCategary = () => {
    return myaxios({
        method: 'get',
        url: '/category'
    })
}

//发布文章
export const postCatagory = (data) => {
    return myaxios({
        method: 'post',
        url: '/post',
        data
    })
}