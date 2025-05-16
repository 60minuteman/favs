'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import styles from './page.module.css'

export default function Home() {
  const [error, setError] = useState<string | null>(null)

  const handleAppleSignIn = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'apple',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            client_id: 'com.do.nothing', // Use the main Service ID, not the signin one
            scope: 'name email',
            response_type: 'code id_token',
            response_mode: 'form_post'
          }
        }
      })

      if (error) {
        console.error('Error:', error.message)
        setError(error.message)
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error instanceof Error ? error.message : 'An error occurred')
    }
  }

  return (
    <main className={styles.main}>
      <button 
        onClick={handleAppleSignIn}
        className={styles.signInButton}
      >
        Sign in with Apple
      </button>
      {error && (
        <p className={styles.error}>{error}</p>
      )}
    </main>
  )
} 