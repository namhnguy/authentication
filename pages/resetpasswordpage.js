import React from "react"
import { useState } from 'react'
import { emailValidator } from '../helpers/emailValidator'
import { sendEmailWithPassword } from "../firebase/auth"
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { useToast } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function ResetPasswordPage({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const toast = useToast()
    const router = useRouter()
    var successReset = false

    const sendResetPasswordEmail = async () => {
        const emailError = emailValidator(email.value)
        if (emailError) {
            setEmail({ ...email, error: emailError })
            if (emailError) {
                toast({
                    title: "Email Invalid",
                    description: emailError,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                })
            }
            return
        }
        setLoading(true)
        const response = await sendEmailWithPassword(email.value)
        if (response.error) {
            toast({
                title: "Something went wrong",
                description: response.error,
                status: "error",
                duration: 9000,
                isClosable: true,
            })
        }
        else {
            successReset = true
        }
        setLoading(false)
        if (successReset) {
            router.push("./signIn")
        }
    }

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Reset Password</Heading>
                <Input placeholder="Email" variant="filled" onChange={(event) => setEmail({ ...email, value: event.currentTarget.value })} mb={3} type="email" />
                <Text fontSize="lg">You will receive password reset link at the email provided if it exist.</Text>
                <Button isLoading={loading} onClick={sendResetPasswordEmail} mb={6} colorScheme='teal'>Send Password Reset</Button>
            </Flex>
        </Flex>
    )
}