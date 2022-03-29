import useInputChange from "../../hook/useInputs";

export default function AdminFacilityForm() {
  const [state, reset, onChange] = useInputChange({
    name: "",
    maxHour: "",
    place: "",
    placeUrl: "",
  });

  const { name, maxHour, place, placeUrl } = state;

  return (
    <form>
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
    </form>
  );
}
