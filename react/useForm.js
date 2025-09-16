import { useState } from "react";
import "./styles.css";

// Builds initial value object like { name: "", email: "" }
function getValue(initValue) {
  const obj = {};
  for (const init of initValue) {
    obj[init.key] = init.value;
  }
  return obj;
}

// Builds validator map like { name: fn, email: fn }
const getValidator = (initValue) => {
  const obj = {};
  for (const init of initValue) {
    obj[init.key] = init.validator;
  }
  return obj;
};

function useForm(initValue) {
  const [values, setValues] = useState(() => getValue(initValue));
  const [errors, setErrors] = useState({});
  const validatorMap = getValidator(initValue);

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    validate(name, value);
  };

  const validate = (name, value) => {
    const validator = validatorMap[name];
    if (!validator) return;

    try {
      const error = validator(value ?? values[name]);
      if (error instanceof Promise) {
        error.then((msg) =>
          setErrors((prev) => ({ ...prev, [name]: msg || null }))
        );
      } else {
        setErrors((prev) => ({ ...prev, [name]: error || null }));
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, [name]: "Validation error" }));
    }
  };

  const validateAll = async () => {
    const newErrors = {};
    for (const key in validatorMap) {
      const validator = validatorMap[key];
      const result = validator(values[key]);
      if (result instanceof Promise) {
        newErrors[key] = await result;
      } else {
        newErrors[key] = result;
      }
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((e) => !e);
  };

  const resetForm = () => {
    setErrors({});
    setValues(getValue(initValue));
  };

  return {
    values,
    errors,
    handleChange,
    resetForm,
    validateAll
  };
}

export default function App() {
  const { values, handleChange, resetForm, validateAll, errors } = useForm([
    {
      key: "name",
      value: "",
      validator: (v) => (!v ? "Name is required" : null)
    },
    {
      key: "email",
      value: "",
      validator: async (v) => {
        if (!v) return "Email is required";
        if (!v.includes("@")) return "Invalid email";
        return null;
      }
    }
  ]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateAll();
    if (isValid) {
      console.log("Form values:", values);
      resetForm();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name</label>
        <input
          name="name"
          value={values.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
      </div>
      <div>
        <label>Email</label>
        <input
          name="email"
          value={values.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
