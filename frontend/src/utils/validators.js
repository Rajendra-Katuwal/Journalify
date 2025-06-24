/**
 * Validates an email address format
 */
export const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  
  /**
   * Validates password strength
   * - At least 8 characters
   * - Contains at least one lowercase letter
   * - Contains at least one uppercase letter
   * - Contains at least one number
   */
  export const validatePassword = (password) => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    
    const hasLowercase = /[a-z]/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    
    if (!hasLowercase || !hasUppercase || !hasNumber) {
      return {
        valid: false,
        message: 'Password must contain at least one lowercase letter, one uppercase letter, and one number'
      };
    }
    
    return { valid: true, message: '' };
  };
  
  /**
   * Validates that the value is not empty
   */
  export const validateRequired = (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return { valid: false, message: 'This field is required' };
    }
    return { valid: true, message: '' };
  };
  
  /**
   * Validates file type against allowed types
   */
  export const validateFileType = (file, allowedTypes) => {
    if (!file) return { valid: false, message: 'No file provided' };
    
    const fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
      return {
        valid: false,
        message: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
      };
    }
    
    return { valid: true, message: '' };
  };
  
  /**
   * Validates file size against maximum size in bytes
   */
  export const validateFileSize = (file, maxSizeBytes) => {
    if (!file) return { valid: false, message: 'No file provided' };
    
    if (file.size > maxSizeBytes) {
      const maxSizeMB = maxSizeBytes / (1024 * 1024);
      return {
        valid: false,
        message: `File size exceeds the maximum allowed size of ${maxSizeMB} MB`
      };
    }
    
    return { valid: true, message: '' };
  };
  
  /**
   * Validates form data with custom validation rules
   */
  export const validateForm = (data, validationRules) => {
    const errors = {};
    let isValid = true;
    
    Object.keys(validationRules).forEach(field => {
      const value = data[field];
      const rules = validationRules[field];
      
      for (const rule of rules) {
        const result = rule.validate(value, data);
        if (!result.valid) {
          errors[field] = result.message;
          isValid = false;
          break;
        }
      }
    });
    
    return { isValid, errors };
  };
  
  /**
   * Creates a validation rule object
   */
  export const createValidationRule = (validate, message) => ({
    validate,
    message,
  });
  
  /**
   * URL validation
   */
  export const validateUrl = (url) => {
    try {
      new URL(url);
      return { valid: true, message: '' };
    } catch (e) {
      return { valid: false, message: 'Please enter a valid URL' };
    }
  };
  
  /**
   * Validates date format
   */
  export const validateDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime()) 
      ? { valid: true, message: '' }
      : { valid: false, message: 'Please enter a valid date' };
  };