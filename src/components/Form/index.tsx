import { Alert, Snackbar } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { FormEvent, useState } from "react";

interface IResponseCep {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

const initialValues = {
  bairro: "",
  cep: "",
  complemento: "",
  ddd: "",
  gia: "",
  ibge: "",
  localidade: "",
  logradouro: "",
  siafi: "",
  uf: "",
};

export default function Form() {
  const [cep, setCep] = useState("");
  const [data, setData] = useState<IResponseCep>();
  const [open, setOpen] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cep === "") {
      setOpen(true);
      setData(undefined);
      return;
    }

    const responseCep = await axios
      .get(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      });

    setData(responseCep);
    setCep("");
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCep(event.target.value);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <form
        onSubmit={onSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "800px",
          margin: "0 auto",
          gap: "20px",
        }}
      >
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={open}
          autoHideDuration={2000}
          onClose={handleClose}
        >
          <Alert severity="error">Por gentileza, preencha o CEP.</Alert>
        </Snackbar>

        <h1
          style={{
            margin: "0 auto",
            padding: "2rem",
            fontFamily: "sans-serif",
          }}
        >
          Busque dados do seu CEP
        </h1>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-evenly",
          }}
        >
          <TextField
            id="input-cep"
            label="Digite seu CEP: "
            multiline
            type={"text"}
            onChange={onChange}
            value={cep}
          />
          <Button
            variant="contained"
            type="submit"
            style={{ width: "150px", height: "55px" }}
          >
            OK
          </Button>

          <Button
            variant="contained"
            color="error"
            style={{ width: "150px", height: "55px" }}
            onClick={() => setData(undefined)}
          >
            LIMPAR
          </Button>
        </div>

        {data && (
          <>
            <TextField
              id="cep"
              label="Cep"
              InputProps={{
                readOnly: true,
              }}
              value={data.cep}
            />
            <TextField
              id="bairro"
              label="Bairro"
              inputProps={{
                readOnly: true,
              }}
              value={data?.bairro}
            />
            <TextField
              id="cep"
              label="CEP"
              inputProps={{
                readOnly: true,
              }}
              value={data?.cep}
            />
            <TextField
              id="complemento"
              label="Complemento"
              inputProps={{
                readOnly: true,
              }}
              value={data?.complemento}
            />
            <TextField
              id="ddd"
              label="DDD"
              inputProps={{
                readOnly: true,
              }}
              value={data?.ddd}
            />
            <TextField
              id="gia"
              label="GIA"
              inputProps={{
                readOnly: true,
              }}
              value={data?.gia}
            />
            <TextField
              id="ibge"
              label="IBGE"
              inputProps={{
                readOnly: true,
              }}
              value={data?.ibge}
            />
            <TextField
              id="localidade"
              label="Localidade"
              inputProps={{
                readOnly: true,
              }}
              value={data?.localidade}
            />
            <TextField
              id="logradouro"
              label="Logradouro"
              inputProps={{
                readOnly: true,
              }}
              value={data?.logradouro}
            />
            <TextField
              id="siafi"
              label="Siafi"
              inputProps={{
                readOnly: true,
              }}
              value={data?.siafi}
            />
            <TextField
              id="uf"
              label="UF"
              inputProps={{
                readOnly: true,
              }}
              value={data?.uf}
            />
          </>
        )}
      </form>
    </div>
  );
}
