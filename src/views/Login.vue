<template>
  <el-row class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到红宝云权限管理系统</h2>
      <el-image :src="require('/src/assets/MarkerHub.jpg')" style="height:180px;width:180px"></el-image>
      <p>公众号 hby</p>
      <p>扫码二维码，回复【红宝云仓库】获取登录密码</p>
    </el-col>

    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>

    <el-col :xl="6" :lg="7">
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="username" style="width:400px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width:400px">
          <el-input v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width:400px">
          <el-input v-model="loginForm.code" style="width:172px;float:left;" maxlength="5"></el-input>
          <el-image :src="captchaImg" class="captchaImg" @click="getCaptcha"></el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">立即登录</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script lang="js">
import axios from 'axios';
import qs from 'qs'
 export default {
    data() {
      return {
        loginForm: {
          username: '',
          password:'',
          code:'',
          token:'',
        },
        captchaImg: null,
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          code: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
            {
              min: 5,
              max: 5,
              message: '长度在5个字符',
              trigger: 'blur',
            },
          ]
        },
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            this.$http.post('/login?' + qs.stringify(this.loginForm)).then((res) => {
              console.log(res)
              const jwt = res.headers['authorization']
              // 将jwt存储到应用store中                     
              this.$store.commit("SET_TOKEN", jwt)   
                                
              this.$router.push("/index")
            }).catch(() => {                     
              this.getCaptcha();                     
              console.log('error submit!!');                  
              })
          } else {
            this.getCaptcha();
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      getCaptcha(){
        axios.get('/api/captcha').then(res => {
          console.log('captcha==>',res)
          this.loginForm.token = res.data.data.token
          this.captchaImg = res.data.data.base64Img
          this.loginForm.code = ''
        })
      }
    },
    created() {         
      this.getCaptcha()      
    }
  }
</script>


<style scoped>
.el-row {
  background-color: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
}
.el-divider {
  height: 200px;
}
.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>
