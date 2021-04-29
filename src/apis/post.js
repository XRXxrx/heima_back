import myaxios from '@/utils/request'

export const getPostList = (params) => {
    return myaxios(({
        method: 'get',
        url: '/post',
        params
    }))
}