import React, { useState } from "react";

export default function IPLRegistrationForm() {
  const [formData, setFormData] = useState({
    teamName: "",
    captainName: "",
    email: "",
    phone: "",
    players: "",
    experience: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Registration Successful!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          IPL Match Registration
        </h2>

        {/* Team Name */}
        <input
          type="text"
          name="teamName"
          placeholder="Team Name"
          value={formData.teamName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* Captain Name */}
        <input
          type="text"
          name="captainName"
          placeholder="Captain Name"
          value={formData.captainName}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* Phone */}
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* Number of Players */}
        <input
          type="number"
          name="players"
          placeholder="Number of Players"
          value={formData.players}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        />

        {/* Experience Dropdown */}
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg"
          required
        >
          <option value="">Select Experience</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="professional">Professional</option>
        </select>

        {/* Checkbox */}
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
          />
          I agree to the rules and regulations
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
        >
          Register Team
        </button>
      </form>
    </div>
  );
}
