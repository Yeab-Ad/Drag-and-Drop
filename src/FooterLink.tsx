import { FaGlobe, FaGithub } from 'react-icons/fa';

interface FooterLinkProps {
    link: string;
    name: string;
    type: string
}

export const FooterLink: React.FC<FooterLinkProps> = ({ link, name, type }) => {
    const linkStyle = {
        color: '#555',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        background: '#ddd',
        padding: '8px',
        borderRadius: '6px',
        marginRight: '10px',
    };

    return (
        <a href={link} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            {type === 'website' && <FaGlobe size={16} style={{ marginRight: '5px' }} />}
            {type === 'git' && <FaGithub size={16} style={{ marginRight: '5px' }} />}
            {name}
        </a>
    );
};