import React, { useState, useEffect } from 'react';
import {
  adminLogin,
  fetchAdminAppointments,
  updateAppointmentStatus,
} from '../services/api';
import { CLINIC_CONFIG } from '../config/clinic';
import {
  Lock,
  LogOut,
  Calendar,
  Clock,
  Phone,
  User,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
} from 'lucide-react';
import '../styles/Admin.css';

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem('diyas_admin_token'));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  // Dashboard Data
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, confirmed: 0, today: 0 });
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    if (token) {
      loadAppointments();
    }
  }, [token, filterStatus, filterDate]);

  const loadAppointments = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetchAdminAppointments({
        status: filterStatus !== 'all' ? filterStatus : undefined,
        date: filterDate || undefined,
        search: searchQuery || undefined,
      });
      if (res.success) {
        setAppointments(res.data);
        if (res.stats) setStats(res.stats);
      }
    } catch (err) {
      console.error('Error fetching admin appointments:', err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        handleLogout();
      }
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      const res = await adminLogin({ username, password });
      if (res.success) {
        localStorage.setItem('diyas_admin_token', res.token);
        setToken(res.token);
      } else {
        setLoginError(res.message || 'Login failed.');
      }
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Invalid administrator credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('diyas_admin_token');
    setToken(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await updateAppointmentStatus(id, newStatus);
      if (res.success) {
        // Optimistically update list
        setAppointments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
        );
        // Refresh counts
        loadAppointments();
      }
    } catch (err) {
      alert('Failed to update status. Please try again.');
    }
  };

  // 1. Login View
  if (!token) {
    return (
      <div className="admin-page-container">
        <div className="container">
          <div className="admin-login-box">
            <div className="admin-login-icon">
              <Lock size={30} />
            </div>
            <h1 className="admin-login-title">Staff Admin Portal</h1>
            <p className="admin-login-subtitle">
              Manage appointments for {CLINIC_CONFIG.name}
            </p>

            {/* Quick Demo Credentials Info */}
            <div
              style={{
                background: 'var(--color-gold-light)',
                border: '1px dashed var(--color-gold)',
                padding: '0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.825rem',
                color: 'var(--color-primary)',
                marginBottom: '1.5rem',
                textAlign: 'left',
              }}
            >
              <strong>Demo Credentials:</strong>
              <div>Username: <code>admin</code></div>
              <div>Password: <code>admin123</code></div>
            </div>

            {loginError && (
              <div
                style={{
                  background: 'var(--color-danger-bg)',
                  color: 'var(--color-danger)',
                  padding: '0.65rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.825rem',
                  marginBottom: '1rem',
                }}
              >
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-field" style={{ textAlign: 'left' }}>
                <label className="form-label" htmlFor="username">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-field" style={{ textAlign: 'left' }}>
                <label className="form-label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary form-submit-btn"
                style={{ marginTop: '1rem' }}
              >
                {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard View
  return (
    <div className="admin-page-container">
      <div className="container">
        {/* Header Bar */}
        <div className="dashboard-header">
          <div>
            <span className="section-badge">Clinic Reception & Staff</span>
            <h1 style={{ fontSize: '2rem', color: 'var(--color-primary)' }}>
              Appointment Management
            </h1>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
              Real-time patient bookings for Dr. Neel Kamal & Dr. Gopal Lal Singhal
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button
              onClick={loadAppointments}
              className="btn btn-outline"
              disabled={isRefreshing}
              title="Refresh list"
            >
              <RefreshCw size={16} className={isRefreshing ? 'animate-spin' : ''} />
              <span>Refresh</span>
            </button>

            <button onClick={handleLogout} className="btn btn-ghost" title="Sign out">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-circle primary">
              <Calendar size={22} />
            </div>
            <div>
              <div className="stat-meta-number">{stats.total}</div>
              <div className="stat-meta-label">Total Bookings</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-circle warning">
              <Clock size={22} />
            </div>
            <div>
              <div className="stat-meta-number">{stats.pending}</div>
              <div className="stat-meta-label">Pending Confirmation</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-circle success">
              <CheckCircle size={22} />
            </div>
            <div>
              <div className="stat-meta-number">{stats.confirmed}</div>
              <div className="stat-meta-label">Confirmed Slots</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-circle info">
              <Calendar size={22} />
            </div>
            <div>
              <div className="stat-meta-number">{stats.today}</div>
              <div className="stat-meta-label">Scheduled Today</div>
            </div>
          </div>
        </div>

        {/* Toolbar & Filters */}
        <div className="admin-toolbar">
          <div className="admin-filter-group">
            <Filter size={16} color="#0E3A43" />
            <select
              className="form-select"
              style={{ width: 'auto', padding: '0.5rem 0.85rem' }}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending Only</option>
              <option value="confirmed">Confirmed Only</option>
              <option value="cancelled">Cancelled Only</option>
            </select>

            <input
              type="date"
              className="form-input"
              style={{ width: 'auto', padding: '0.45rem 0.85rem' }}
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              placeholder="Filter by date"
            />
            {filterDate && (
              <button
                onClick={() => setFilterDate('')}
                className="btn btn-ghost"
                style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
              >
                Clear Date
              </button>
            )}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search patient / phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && loadAppointments()}
                className="form-input"
                style={{ paddingRight: '2.5rem', fontSize: '0.85rem' }}
              />
              <button
                onClick={loadAppointments}
                style={{
                  position: 'absolute',
                  right: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--color-primary)',
                }}
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="table-responsive-wrapper">
          <table className="admin-appointments-table">
            <thead>
              <tr>
                <th>Ref #</th>
                <th>Patient Name</th>
                <th>Phone</th>
                <th>Service / Concern</th>
                <th>Preferred Date & Slot</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '3rem' }}>
                    <AlertCircle size={28} color="#C5A059" style={{ margin: '0 auto 0.5rem auto' }} />
                    <p>No appointment records found matching your filters.</p>
                  </td>
                </tr>
              ) : (
                appointments.map((appt) => (
                  <tr key={appt.id}>
                    <td>
                      <strong>#{appt.id}</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>
                        {appt.patient_name}
                      </div>
                      {appt.message && (
                        <div style={{ fontSize: '0.785rem', color: '#6b7280', maxWidth: '240px' }}>
                          "{appt.message}"
                        </div>
                      )}
                    </td>
                    <td>
                      <a
                        href={`tel:${appt.phone}`}
                        style={{ color: 'var(--color-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                      >
                        <Phone size={13} /> {appt.phone}
                      </a>
                    </td>
                    <td>
                      <span className="specialty-chip" style={{ fontSize: '0.8rem' }}>
                        {appt.service_title || 'General Care'}
                      </span>
                    </td>
                    <td>
                      <div>
                        <strong>{appt.preferred_date}</strong>
                      </div>
                      <div style={{ fontSize: '0.785rem', color: 'var(--color-text-muted)' }}>
                        {appt.preferred_time || '[Timings]'}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${appt.status}`}>{appt.status}</span>
                    </td>
                    <td>
                      <div className="action-status-btn-group">
                        {appt.status !== 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'confirmed')}
                            className="action-btn-mini confirm"
                            title="Confirm appointment"
                          >
                            Confirm
                          </button>
                        )}
                        {appt.status !== 'cancelled' && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'cancelled')}
                            className="action-btn-mini cancel"
                            title="Cancel appointment"
                          >
                            Cancel
                          </button>
                        )}
                        {appt.status !== 'pending' && (
                          <button
                            onClick={() => handleStatusChange(appt.id, 'pending')}
                            className="action-btn-mini"
                            style={{ background: '#f3f4f6', color: '#4b5563' }}
                            title="Set back to pending"
                          >
                            Reset
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
