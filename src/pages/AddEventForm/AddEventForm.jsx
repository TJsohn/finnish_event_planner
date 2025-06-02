import styles from "./AddEventForm.module.css";

const AddEventForm = () => {
  return (
    <>
      <form>
        <h1>Add Event Form</h1>
        <div>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" />
          <label htmlFor="date">Date</label>
          <input type="date" id="date" name="date" />
          <label htmlFor="location">Location</label>
          <input type="text" id="location" name="location" />
          <label htmlFor="description">Description</label>
          <input type="text" id="description" name="description" />

          <label htmlFor="type">Type</label>
          <select id="type" name="type">
            <option value="culture">Culture</option>
            <option value="education">Education</option>
            <option value="sport">Sport</option>
            <option value="technology">Technology</option>
            <option value="entertainment">Entertainment</option>
            <option value="travel">Travel</option>
          </select>

          <div>
            <button>Add</button>
            <button>See more</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddEventForm;
