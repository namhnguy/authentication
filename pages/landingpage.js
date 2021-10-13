import React from "react";
import { logoutUser } from "../firebase/auth";
import { Button } from '@chakra-ui/button'
import { Flex, Heading } from '@chakra-ui/layout'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from "../firebase/initFirebase"
import { useRouter } from "next/router";
import { Box } from '@chakra-ui/react'

export default function LandingPage() {
    const [user, loading, error] = useAuthState(firebase.auth())
    const router = useRouter()

    if (user) {
        return (
            <><Box bg="pink" textColor="black" fontSize="32" textAlign="center" w="100%" p={4} color="black">
                HealthTok
            </Box>
            <Flex height="40vh" alignItems="center" justifyContent="center">
                <Flex direction="column" p={12} rounded={6}>
                    <Heading mb={6}>Welcome {user.email}!</Heading>
                    <Heading textAlign="center" mb={6}>This is the landing page.</Heading>
                    <Button onClick={logoutUser} mb={6} background="gray.900" textColor='white'>Logout</Button>
                </Flex>
            </Flex></>
        )
    }
    else{
        return (
            <><Box bg="pink" textColor="black" fontSize="32" textAlign="center" w="100%" p={4} color="black">
                HealthTok
            </Box>
            <Flex height="40vh" alignItems="center" justifyContent="center">
                <Flex direction="column" p={12} rounded={6}>
                    <Heading textAlign="center" mb={6}>Welcome Guest!</Heading>
                    <Heading textAlign="center" mb={6}>This is the landing page.</Heading>
                    <Button onClick={() => { router.push("./signIn"); } } mb={6} background="gray.900" textColor='white'>Go to sign in</Button>
                </Flex>
            </Flex></>
        )
    }
}
