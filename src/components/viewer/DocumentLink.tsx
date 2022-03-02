import React from "react";

interface DocumentLinkProps {
    link : string;
}

const DocumentLink = (props : DocumentLinkProps) => {
  return (
    <a type="button" target="_blank" href={props.link} className="float-right w-full bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded my-2">
        {extractName(props.link)}
    </a>
  )
}

export default DocumentLink;

function extractName(link : string) : string {
    const url = new URL(link);
    return url.hostname
}