import styled from 'styled-components';

const DialogWrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({theme}) => theme.colors.background.darkMask};
  z-index: 15;
`

const DialogContent = styled.div`
  padding: 4rem 6.4rem 2rem 6.4rem;
  border: .3rem solid ${({theme}) => theme.colors.primary.default};
  line-height: 1.6;
  color: ${({theme}) => theme.colors.primary.default};
  background: ${({theme}) => theme.colors.basic.white};
  max-width: 100rem;
  
  h3 {
    margin: 1.2rem 0;
    font-size: 2rem;
    font-weight: bold;
  }
  
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 4rem;
  }
  
  .button {
    margin-right: 1.6rem;
    padding: .4rem 4rem;
    border: .3rem solid ${({theme}) => theme.colors.primary.default};
    font: 1.6rem 'Noto Sans TC', sans-serif;
    color: ${({theme}) => theme.colors.primary.default};
    background: ${({theme}) => theme.colors.basic.white};
    transition: all .2s;
    cursor: pointer;
    
    &:last-child {
      margin-right: 0;
    }

    &:hover {
      color: ${({theme}) => theme.colors.basic.white};
      background: ${({theme}) => theme.colors.primary.default};
    }
    
    &:focus {
      outline: none;
    }
    
    &.primary {
      color: ${({theme}) => theme.colors.text.lightest};
      background: ${({theme}) => theme.colors.primary.default};
    }
  }
`

const ConfirmBlock = styled.div`
  p {
    font-weight: 500;
  }
`

const ListDetailBlock = styled.div`
  .inputItem {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.6rem;
  }
  
  h3 {
    margin: 1.2rem 0;
    font-size: 2.5rem;
    font-weight: bold;
  }

  label {
    margin-bottom: .4rem;
    font-size: 2rem;
    font-weight: 500;
  }

  input[type=text],
  input[type=password],
  input[type=tel],
  input[type=email],
  textarea,
  select {
    width: 28rem;
  }

  select {
    height: 4rem;
  }
`

const CloseButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-left: .3rem solid ${({theme}) => theme.colors.primary.default};
  border-bottom: .3rem solid ${({theme}) => theme.colors.primary.default};
  width: 4rem;
  height: 4rem;
  font-size: 2.8rem;
  transition: all .2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: ${({theme}) => theme.colors.basic.white};
    background: ${({theme}) => theme.colors.primary.default};
  }
`

export {
  DialogWrapper,
  DialogContent,
  ConfirmBlock,
  ListDetailBlock,
  CloseButton
};
