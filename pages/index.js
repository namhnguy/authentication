import React from 'react'
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { useRouter } from 'next/router'

export default function StartPage() {
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const router = useRouter()

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={12} rounded={6}>
                <Heading mb={6}>Welcome to HealthTok</Heading>
                <Button onClick={() => {router.push("./signIn")}} mb={6} colorScheme='teal'>Login</Button>
                <Button onClick={() => {router.push("./signUp")}} mb={6} colorScheme='teal'>Sign Up</Button>
            </Flex>
        </Flex>
    )
}