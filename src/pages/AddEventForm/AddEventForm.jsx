import "./AddEventForm/AddEventForm.module.css";

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
