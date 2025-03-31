/* TODO : 로그인 유무에 따라 나타나는 메뉴 리스트가 다릅니다. */

export const NoLoginmenuList = [
  {
    id:0,
    name:"회원가입",
    link:'/register'
  },
  {
    id:1,
    name:"로그인",
    link:'/login'
  },
]

export const LoginmenuList = [
  {
    id:0,
    name:"새주문",
    link:'/order'
  },
  {
    id:1,
    name:"주문내역",
    link:'/orderlist'
  },
  {
    id:2,
    name:"게시판",
    link:'/faq'
  },
  {
    id:3,
    name:"충전액",
    link:'/pointcharge'
  },
  {
    id:4,
    name:"계정설정",
    link:'/accountsetting'
  },
  {
    id:5,
    name:"로그아웃",
  },
]