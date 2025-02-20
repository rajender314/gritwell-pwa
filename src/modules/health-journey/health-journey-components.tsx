import styled from 'styled-components';

export const SectionCont = styled.div`
margin:20px;
border: 1px solid #EEF0F4;
border-radius: 16px;
background: white;
&.b-0{
    border: 0;
}
&.bg-tr{
    background: transparent;
}
&.center-250{
    height: 350px;
    width: 100%;
}
&.m-0{
    margin: 20px 0;
}
&.br-clr{
    border-color: transparent;
}
`;
export const SectionPillsCont = styled.div`
background: white;
`;
export const SectionPills = styled.div`
    display: flex;
    gap: 15px;
    overflow: auto;
    margin: 15px;
    justify-content: space-around;
`;
