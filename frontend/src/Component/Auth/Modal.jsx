import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const UserModal = ({ isOpen, onRequestClose, data }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="User Details"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          padding: '20px',
          borderRadius: '10px',
          width: '400px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
          backgroundColor: '#f0f0f0',
        },
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>User Details</h2>
      <img
        src={data.avatar.url}
        alt="User Avatar"
        style={{
          display: 'block',
          margin: '0 auto 20px',
          borderRadius: '50%',
          width: '100px',
          height: '100px',
        }}
      />
      <ul style={{ listStyle: 'none', padding: '0', marginBottom: '20px' }}>
     
        <li style={{ marginBottom: '10px' }}><strong>Username:</strong> {data.username}</li>
        <li style={{ marginBottom: '10px' }}><strong>Email:</strong> {data.email}</li>
        <li style={{ marginBottom: '10px' }}><strong>Email Verified:</strong> {data.isEmailVerified ? "Yes" : "No"}</li>
        <li style={{ marginBottom: '10px' }}><strong>Login Type:</strong> {data.loginType}</li>
        <li style={{ marginBottom: '10px' }}><strong>Role:</strong> {data.role}</li>
        <li style={{ marginBottom: '10px' }}><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</li>
        <li style={{ marginBottom: '10px' }}><strong>Updated At:</strong> {new Date(data.updatedAt).toLocaleString()}</li>
      </ul>
      <button
        onClick={onRequestClose}
        style={{
          display: 'block',
          margin: '0 auto',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </Modal>
  );
};

export default UserModal;
