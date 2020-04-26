

function logout(){
  auth.signOut().then(()=>{
    console.log('signed out')
  })
}