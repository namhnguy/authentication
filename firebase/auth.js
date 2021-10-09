import firebase from "./initFirebase"

export const logoutUser = () => {
    firebase.auth().signOut()
    console.log("success sign out")
}

export const signUpUser = async ({ name, email, password }) => {
    try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
        firebase.auth().currentUser.updateProfile({
          displayName: name,
        })
        return { user }
    } catch (error) {
        return {
          error: error.message,
        }
    }
}

export const loginUser = async ({ email, password }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
      return { user }
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }
  
  export const sendEmailWithPassword = async (email) => {
    try {
      console.log(email)
      await firebase.auth().sendPasswordResetEmail(email)
      return {}
    } catch (error) {
      return {
        error: error.message,
      }
    }
  }