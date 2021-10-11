import React from "react";
import { logoutUser } from "../firebase/auth";
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from "../firebase/initFirebase"
import { useRouter } from "next/router";

export default function LandingPage() {
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const [user, loading, error] = useAuthState(firebase.auth())
    const router = useRouter()

    if (user) {
        return (
            <Flex height="40vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background={formBackground} p={12} rounded={6}>
                    <Heading mb={6}>Welcome {user.email}!</Heading>
                    <Heading textAlign="center" mb={6}>This is the landing page.</Heading>
                    <Button onClick={logoutUser} mb={6} colorScheme='teal'>Logout</Button>
                </Flex>
            </Flex>
        )
    }
    else{
        return (
            <Flex height="40vh" alignItems="center" justifyContent="center">
                <Flex direction="column" background={formBackground} p={12} rounded={6}>
                    <Heading textAlign="center" mb={6}>Welcome Guest!</Heading>
                    <Heading textAlign="center" mb={6}>This is the landing page.</Heading>
                    <Button onClick={() => {router.push("./signIn")}} mb={6} colorScheme='teal'>Go to sign in</Button>
                </Flex>
            </Flex>
        )
    }
}
