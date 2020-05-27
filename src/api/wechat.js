import { getOpenId } from './index'

export function getSetting(auth, onSucess, onFail) {
  mpvue.getSetting({
    success(res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSucess(res)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res);  //直接抛出异常    
    }
  })
}

export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success(res) {
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res);//直接抛出异常
    }

  })
}

export function setStorageSync(key, data) {
  mpvue.setStorageSync(key, data)
}

export function getStorageSync(key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId(callback) {
  mpvue.login({
    success(res) {

      console.log(res);
      
      if (res.code) {
        const { code } = res  

        console.log(code);  
        
        getOpenId(code).then(response => {

          console.log(response);
          
          const { data: { data: { openid } } } = response

          setStorageSync('openId', openid)

          callback && callback(openid)

        }).catch(err => {
          console.log('失败') // 直接抛出异常
        })
      } else {
        console.log(res) // 直接抛出异常
      }
    },
    fail(res) {
      console.log(res) // 直接抛出异常
    }
  })
}