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


export default function StartPage() {
    const formBackground = useColorModeValue("gray.100", "gray.700")
    const router = useRouter()
    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Flex direction="column" background={formBackground} p={6} rounded={6}>
               <Heading textAlign="center" fontSize="22" mb={4}>The reset password link was successfully sent to the email provided. It may take a few moments to show up.</Heading>
              <Button variant="link" onClick={() => {router.push("./signIn")}} mb={6} colorScheme='teal'>Back to sign in</Button>
          </Flex>
     </Flex>
    )
}
