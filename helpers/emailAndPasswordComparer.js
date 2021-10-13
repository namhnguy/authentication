export function emailAndPasswordComparer(email, confirmEmail, password, confirmPassword) {
    if (email != confirmEmail && password != confirmPassword){
        return "Emails and passwords are not the same"
    }
    if (email != confirmEmail) {
        return "Emails are not the same."
    }
    if (password != confirmPassword) {
        return "Passwords are not the same."
    }
    return ''
}