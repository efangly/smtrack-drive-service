import { FaFile, FaTrash, FaShare } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import axios from "axios";

type File = { name: string, url: string }
const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export default function CardList({ type }: { type: string }) {
  const [file, setFile] = useState<File[]>([]);
  const getFile = async (path: string) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_SERVER}/api/${path}`);
      setFile(response.data.files);
    } catch (error: any) {
      console.log(error.response?.data?.error || 'Get file');
    }
  }
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_API_SERVER}/${text}`);
    Toast.fire({ icon: "success", title: "Copy link to clipboard" });
  }
  const deleteFile = async (path: string) => {
    try {
      Swal.fire({
        text: "ต้องการที่จะลบ?",
        icon: 'error',
        showCancelButton: true,
        confirmButtonColor: '##FF3030',
        cancelButtonColor: '#595959',
        confirmButtonText: 'Delete'
      }).then( async (result) => {
        if (!result.isConfirmed) return
        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_SERVER}/${path}`);
        await getFile(type);
        Toast.fire({ icon: "success", title: response.data.message });
      });
    } catch (error: any) {
      Toast.fire({ icon: "error", title: error.response?.data?.error || 'Delete file' });
    }
  }
  useEffect(() => {
    getFile(type);
  }, []);
  return (
    <div className="flex flex-wrap gap-3 justify-center">
      { file.length == 0 ? <div></div> : file.map((items, index) => { 
        return (
          <div className="card card-bordered bg-base-100 min-h-44 max-h-44 min-w-48 max-w-48 shadow-xl p-2 rounded-xl" key={index}>
            <figure>
              <FaFile size={55} />
            </figure>
            <div className="card-body flex flex-col justify-between p-1 mt-2">
              <label className="text-xs self-center text-balance">{items.name}</label>
              <div className="card-actions justify-end">
                <button className="btn btn-sm btn-success" onClick={() => copyToClipboard(items.url)}>
                  <FaShare />
                </button>
                <button className="btn btn-sm btn-primary" onClick={() => deleteFile(items.url)}>
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        )}) 
      }
    </div>
  );
}
