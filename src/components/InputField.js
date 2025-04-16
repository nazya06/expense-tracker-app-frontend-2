import React from 'react';

const InputField = ({ label, type, value, onChange, error }) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`form-control ${error ? 'is-invalid' : ''}`}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default InputField;