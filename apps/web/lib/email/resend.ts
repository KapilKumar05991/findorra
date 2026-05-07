import { Token } from '@repo/db'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const api_url = process.env.AUTH_URL

export async function sendVerifyEmail(token: Token) {
    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: token.identifier,
            subject: 'Confirm your email',
            html: `<div>
            <p>Hi, Welcome to Naestero</p>
            <p>Your Verification Token is <b>${token.token}</b>.</p>
            <p>if you didn't signup for Naestero, you can safely ignore this email.</p>
            <p>Best Regards</p>
            <p>Findorra</p>
            </div>`
        })

        return result
    } catch (error) {
        throw error
    }
}

export async function sendForgotEmail(token: Token) {
    try {
        const result = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: token.identifier,
            subject: 'Forgot Your Password',
            html: `<div>
            <p>Click <a href='${api_url}/reset?token=${token.token}&identifier=${token.identifier}'>here</a> to reset your password.</p>
            <p>Findorra</p>
            </div>`
        })
    
        return result
    } catch (error) {
        throw error
    }
}