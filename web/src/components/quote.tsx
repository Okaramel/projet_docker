type Props = {
  quote_author: string,
  quote_content: string
}
export const Quote = ({quote_author, quote_content}: Props) => {
  if (quote_author == "" || quote_author == "")
    return (<></>)
  return ( 
    <div className="quote">
      <p className="quote_content">"{quote_content}"</p>
      <p className="quote_author">- {quote_author}</p>
    </div>
  );
}