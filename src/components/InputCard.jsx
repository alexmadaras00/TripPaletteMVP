export default function InputCard({name,value,image}) {
    return (
        <div className="card-props">
            <div className="image-props">{image}</div>
            <h1 className="name-props">{name}</h1>
            <p className="value-props">{name=="Budget" ? `€${value}`: value}</p>
        </div>
    );
}