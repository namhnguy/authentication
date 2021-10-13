import React from "react"
import { useState } from 'react'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { loginUser } from '../firebase/auth'
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import { Box } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function loginScreen({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [password, setPassword] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
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
                <Heading mt={450} fontSize="14" textColor="black" textAlign={'left'} mb={1}>EMAIL ADDRESS:</Heading>
                <Input focusBorderColor="gray.900" variant="filled" onChange={(event) => setEmail({ ...email, value: event.currentTarget.value })} mb={10} type="email" />
                <Heading fontSize="14" textColor="black" textAlign={'left'} mb={1}>PASSWORD:</Heading>
                <Input variant="filled" onChange={(event) => setPassword({ ...password, value: event.currentTarget.value })} mb={6} type="password" />
                <Button isLoading={loading} onClick={onLoginPressed} mb={2} background="gray.900" textColor='white'>Login</Button>
                <Button variant="link" textAlign="right" onClick={() => { router.push("./resetpasswordpage") } } mb={300} textColor='gray'>Forgot password?</Button>
                <Button variant="link" onClick={() => { router.push("./signUp") } } colorScheme='black'>Not a member? Sign up now</Button>
            </Flex>
        </Flex></>
    )
}
