import {Link } from "react-router-dom"

import React from 'react'

export default function Public() {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to Repair Store!</h1>
            </header>
            <main>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto vitae cupiditate modi. Mollitia, aperiam impedit! Accusantium hic nulla reprehenderit culpa.</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
