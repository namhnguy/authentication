import React from "react"
import { useState } from 'react'
import { emailValidator } from '../helpers/emailValidator'
import { sendEmailWithPassword } from "../firebase/auth"
import { Button } from '@chakra-ui/button'
import { Input } from '@chakra-ui/input'
import { Flex, Heading } from '@chakra-ui/layout'
import { useToast } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { useRouter } from "next/router"

export default function ResetPasswordPage({ navigation }) {
    const [email, setEmail] = useState({ value: '', error: '' })
    const [loading, setLoading] = useState()
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
        <Flex height="50vh" alignItems="center" justifyContent="center">
            <Flex direction="column" p={12} rounded={6}>
                <Button size="xs" textColor="black" fontSize="40" textAlign={'left'} justifyContent="left" variant="link" onClick={() => {router.push("./signIn")}} mb={6} colorScheme='gray'>&lt;-</Button>
                <Heading textAlign="center" textColor="black" mb={40}>Reset Password</Heading>
                <Heading mt={4} fontSize="14" textColor="black" textAlign={'left'} mb={1}>EMAIL ADDRESS:</Heading>
                <Input variant="filled" onChange={(event) => setEmail({ ...email, value: event.currentTarget.value })} mb={3} type="email" />
                <Button background="gray.900" textColor='white' isLoading={loading} onClick={sendResetPasswordEmail} onClick={() => {router.push("./signIn")}} mb={6}>Send Reset Link</Button>
            </Flex>
        </Flex>
    )
}
