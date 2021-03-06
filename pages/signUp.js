import React from "react"
import { useState } from 'react'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { signUpUser } from '../firebase/auth'
import { emailAndPasswordComparer } from '../helpers/emailAndPasswordComparer'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { Box } from '@chakra-ui/react'

export default function signUpScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [confirmEmail, setConfirmEmail] = useState({ value: '', error: '' })
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const toast = useToast()
    const router = useRouter()
    var sucessSignUp = false

    const onSignUpPressed = async () => {
        const emailError = emailValidator(email.value)
        const emailConfirmError = emailValidator(confirmEmail.value)
        const passwordError = passwordValidator(password.value)
        const passwordConfirmError = passwordValidator(confirmPassword.value)
        const compareEmailAndPassword = emailAndPasswordComparer(email.value, confirmEmail.value, password.value, confirmPassword.value)
        if (emailError || passwordError || emailConfirmError || passwordConfirmError || compareEmailAndPassword) {
            setEmail({ ...email, error: emailError })
            setPassword({ ...password, error: passwordError })
            setConfirmEmail({ ...confirmEmail, error: emailConfirmError })
            setConfirmPassword({ ...confirmPassword, error: passwordConfirmError })
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
            if (emailConfirmError) {
                toast({
                    title: "Confirm Email Invalid",
                    description: emailConfirmError,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            if (passwordConfirmError) {
                toast({
                    title: "Confirm Password Invalid",
                    description: passwordConfirmError,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            if (compareEmailAndPassword) {
                toast({
                    title: "Email or Password do not match",
                    description: compareEmailAndPassword,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            return
        }
        setLoading(true)
        const response = await signUpUser({
            email: email.value,
            password: password.value,
        })
        if (response.error) {
            toast({
                title: "Unable to register this account",
                description: response.error,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        else {
            sucessSignUp = true
        }
        setLoading(false)
        if (sucessSignUp) {
            router.push("./successSignUp")
        }
    }

    return (
        <><Box textColor="black" fontSize="32" textAlign="center" w="100%" p={10} color="black">

        </Box>
        <Box textColor="black" fontSize="32" textAlign="center" w="100%" p={1} color="black">
                Welcome to Healthtok
        </Box>
        <Box textColor="black" fontSize="24" textAlign="center" w="100%" p={0} color="black">
                Made to inspire, share your story today
        </Box>
        <Flex height="50vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={12} rounded={6}>
                <Heading mt={400} fontSize="14" textColor="black" textAlign={'left'} mb={1}>EMAIL ADDRESS:</Heading>
                <Input focusBorderColor="gray.900" variant="filled" onChange={(event) => setEmail({ ...email, value: event.currentTarget.value })} mb={2} type="email" />
                <Heading fontSize="14" textColor="black" textAlign={'left'} mb={1}>CONFIRM EMAIL ADDRESS:</Heading>
                <Input  focusBorderColor="gray.900" variant="filled" mb={6} onChange={(event) => setConfirmEmail({ ...confirmEmail, value: event.currentTarget.value })} />
                <Heading fontSize="14" textColor="black" textAlign={'left'} mb={1}>PASSWORD:</Heading>
                <Input  variant="filled" onChange={(event) => setPassword({ ...password, value: event.currentTarget.value })} mb={2} type="password" />
                <Heading fontSize="14" textColor="black" textAlign={'left'} mb={1}>CONFIRM PASSWORD:</Heading>
                <Input  variant="filled" mb={6} type="password" onChange={(event) => setConfirmPassword({ ...confirmPassword, value: event.currentTarget.value })} />
                <Button isLoading={loading} onClick={onSignUpPressed} mb={250} background="gray.900" textColor='white'>Sign Up</Button>
                <Button variant="link" onClick={() => { router.push("./signIn") } } colorScheme='black'>Already have an account? Sign in now</Button>
            </Flex>
        </Flex></>
    )
}
