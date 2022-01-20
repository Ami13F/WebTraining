import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

type Props = {
  value: string | null;
  options: string[];
  label: string;
};

type Actions = {
  onChange(value: string): void;
};

export default function CutomAutoComplete(props: Props & Actions) {
  return (
    <Autocomplete
      freeSolo
      value={props.value}
      options={[...new Set(props.options)]}
      renderInput={params => (
        <TextField
          required
          onChange={e => {
            props.onChange(e.target.value);
          }}
          {...params}
          label={props.label}
        />
      )}
      onChange={(e, value) => {
        props.onChange(value || "");
      }}
    />
  );
}
