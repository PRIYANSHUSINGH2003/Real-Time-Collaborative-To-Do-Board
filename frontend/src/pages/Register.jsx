import React, { useState } from 'react';

export default function Register({ onSuccess }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.username || !form.password) return setError('All fields required');
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) return setError(data.message || 'Registration failed');
      setSuccess(true);
      setTimeout(onSuccess, 1200);
    } catch {
      setError('Network error');
    }
  };

  return (
    <div style={{ maxWidth: 340, margin: '60px auto', background: '#fff', borderRadius: 12, boxShadow: 'var(--shadow)', padding: 32 }}>
      <h2 style={{ marginBottom: 18 }}>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} style={{ padding: 8, borderRadius: 6, border: '1px solid var(--border)' }} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} style={{ padding: 8, borderRadius: 6, border: '1px solid var(--border)' }} />
        {error && <div style={{ color: 'red', fontSize: '0.95em' }}>{error}</div>}
        {success && <div style={{ color: 'green', fontSize: '0.95em' }}>Registration successful!</div>}
        <button type="submit" style={{ background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 0', fontWeight: 600, cursor: 'pointer' }}>Register</button>
      </form>
    </div>
  );
}
