import myaxios from '@/utils/request'

export const getPostList = () => {
    return myaxios(({
        method: 'get',
        url: '/post'
    }))
}