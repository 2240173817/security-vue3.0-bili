// 引入mockjs
const Mock = require("mockjs");
// 获取 mock.Random 对象// 参考：https://github.com/nuysoft/Mock/wiki/Mock.Random
const Random = Mock.Random;
let Result = { code: 200, msg: "操作成功", data: null };
/** * Mock.mock( url, post/get , function(options))；
 * url 表示需要拦截的 URL，
 * post/get 需要拦截的 Ajax 请求类型
 * 用于生成响应数据的函数
 * /// 获取验证码图片base64编码以及一个随机码*/
Mock.mock("/captcha", "get", () => {
  Result.data = {
    token: Random.string(32), // 获取一个32位的随机字符串,
    captchaImg: Random.dataImage("120x40", "11111"), //生成验证码为11111的base64图片编码
  };
  return Result;
});

Mock.mock(RegExp("/login*"), "post", () => {
  // 这里无法在header添加authorization，直接跳过
  console.log("mock----------------login");
  return Result;
});

Mock.mock("/sys/userInfo",'get',()=>{
  Result.data = {
    id:'1',
    username: 'gao',
    avatar:'https://avatars.githubusercontent.com/u/58835890?s=20&u=b1f1425a29e09a809a5eb11ee0ec529e7ad49c43&v=4'
  }
  return Result;
})

Mock.mock("/logout",'post',()=>{
  return Result;
})
