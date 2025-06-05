import {useState} from 'react';
import { useNavigate } from "react-router";
import useAxios from "./../../hooks/useAxios";
import styles from "./AddEventForm.module.css";

const AddEventForm = ({onAddEvent}) => {
  const { post } = useAxios();
  const today = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    title: '',
    date: today,
    location: '',
    description: '',
    category: 'culture',
    startTime: '',
    endTime: '',
    imageUrl: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.date <= today) {
      alert("Please select a future date.");
      return;
    }

    const newEvent = {...formData};

    try {
      const res = await post('/events', newEvent);
      onAddEvent(res.data);
      navigate('/events');
    } catch (err) {
      console.error("Error adding event:", err);
    }

    };

  return (
    <>
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input className={styles.inputMedium} type="text" placeholder="Enter event title" value={formData.title} onChange={handleChange} id="title" name="title" />

          <label htmlFor="category">Category</label>
          <select className={styles.inputSmall} value={formData.category} onChange={handleChange} id="category" name="category">
            <option value="culture">Culture</option>
            <option value="education">Education</option>
            <option value="sport">Sport</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>

          <label htmlFor="date">Date</label>
          <input className={styles.inputSmall} type="date" value={formData.date} onChange={handleChange} id="date" name="date" />

          <label htmlFor="startTime">Start Time</label>
          <input className={styles.inputSmall} type="time" value={formData.startTime} onChange={handleChange} id="stateTime" name="startTime" />
          <label htmlFor="endTime">End Time</label>
          <input className={styles.inputSmall} type="time" value={formData.endTime} onChange={handleChange} id="endTime" name="endTime" />

          <label htmlFor="location">Location</label>
          <input className={styles.inputMedium} type="text" placeholder='Enter full address (e.g., Mannerheimintie 20, 00100 Helsinki, Finland)' value={formData.location} onChange={handleChange} id="location" name="location" />

          <label htmlFor="description">Description</label>
          <textarea className={styles.inputLarge} type="text" placeholder="Enter description of event" rows={30} id="description" name="description" />

          <label htmlFor="imageUrl">Event Image</label>
          <input className={styles.inputMedium} type="url" placeholder='Enter image URL (e.g., https://example.com/image.jpg)' value={formData.imageUrl} onChange={handleChange} id="imageUrl" name="imageUrl" />


          <div>
            <button className={styles.submitBtn}>Add Event</button>
          </div>
        </div>
      </form>
        </div>
    </>
  );
};

export default AddEventForm;