export default function AdminFacilityForm({ fid, editFacility, form, onChange, reset }) {
  const { name, maxHour, place, placeUrl } = form;

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        onChange={onChange}
        value={name}
        placeholder="name"
        required
      />
      <input
        name="maxHour"
        onChange={onChange}
        value={maxHour}
        placeholder="maxHour"
        required
      />
      <input
        name="place"
        onChange={onChange}
        value={place}
        placeholder="place"
        required
      />
      <input
        name="placeUrl"
        onChange={onChange}
        value={placeUrl}
        placeholder="placeUrl"
        required
      />
      <button>제출</button>
      <button onClick={reset}>초기화</button>
    </form>
  );
}
