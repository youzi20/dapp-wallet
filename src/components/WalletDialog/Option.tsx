import styled from "@emotion/styled"

interface OptionType {
    link?: string | null
    icon?: string
    text: string
    onClick?: null | (() => void)
}

const OptionWrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
flex-shrink: 0;
width: 300px;
height: 160px;
border-radius: 4px;
transition: all .3s ease-in-out;
cursor: pointer;

&:hover {
    background-color: #efefef;
}
`;

const OptionIcon = styled.div`
width: 56px;
height: 56px;
font-weight: bold;
font-size: 24px;
color: #efefef;
text-align: center;
line-height: 56px;
text-transform: uppercase;
border-radius: 50%;
overflow: hidden;

img {
    width: 100%;
}
`;

const OptionTitle = styled.div`
font-size: 18px;
font-weight: bold;
color: #686868;
text-align: center;
margin-top: 15px;
`;


export default function Option({ link, icon, text, onClick }: OptionType) {
    const content = <OptionWrapper onClick={() => !link && onClick && onClick()}>
        <OptionIcon style={{ backgroundColor: !icon ? "#686868" : undefined }}>{icon ? <img src={icon} /> : text.substring(0, 1)}</OptionIcon>
        <OptionTitle>{text}</OptionTitle>
    </OptionWrapper>

    if (link) {
        return <a href={link} target="_blank">{content}</a>
    }

    return content;
}