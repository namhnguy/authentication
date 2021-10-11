import React from "react"
import { useState } from 'react'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { loginUser } from '../firebase/auth'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function loginScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const toast = useToast()
    const router = useRouter()
    var successSignIn = false

    const onLoginPressed = async () => {
        const emailError = emailValidator(email.value)
        const passwordError = passwordValidator(password.value)
        if (emailError || passwordError) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            if (emailError) {
                toast({
                    title: "Email Invalid",
                    description: emailError,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            if (passwordError) {
                toast({
                    title: "Password Invalid",
                    description: passwordError,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            return
        }
        setLoading(true)
        const response = await loginUser({
            email: email.value,
            password: password.value,
        })
        if (response.error) {
            toast({
                title: "Something went wrong!",
                description: response.error,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        else {
            successSignIn = true
        }
        setLoading(false)
        if (successSignIn) {
            router.push("./landingpage")
        }
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Button size="xs" textAlign={'left'} justifyContent="left" variant="link" onClick={() => {router.push("./")}} mb={6} colorScheme='teal'>&lt;-Back</Button>
                <Heading textAlign={'center'} mb={6}>Sign In</Heading>
                <Input placeholder="E-mail" variant="filled" onChange={(event) => setEmail({ ...email, value: event.currentTarget.value })} mb={3} type="email" />
                <Input placeholder="Password" variant="filled" onChange={(event) => setPassword({ ...password, value: event.currentTarget.value })} mb={6} type="password" />
                <Button isLoading={loading} onClick={onLoginPressed} mb={6} colorScheme='teal'>Login</Button>
                <Button variant="link" onClick={() => {router.push("./resetpasswordpage")}} mb={2} colorScheme='teal'>Forgot password?</Button>
                <Button variant="link" onClick={() => {router.push("./signUp")}} colorScheme='teal'>Don't have an account? Register now!</Button>
            </Flex>
        </Flex>
    )
}
