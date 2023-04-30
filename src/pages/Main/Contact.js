import React from 'react';
import { Row, Col, Divider } from 'antd';
import { AiOutlineMail, AiOutlinePhone, AiOutlineInstagram, AiOutlineYoutube } from 'react-icons/ai';
import { FaWhatsapp } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="mobile:w-[512px] w-screen text-slate-400 pb-[99px] px-6">
            <h1 className="text-3xl font-semibold mb-5 text-center mt-2">Contact Us</h1>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12}>
                    <h2 className="text-2xl font-semibold mb-3">Phone</h2>
                    <p className="text-xl">
                        <AiOutlinePhone size={24} className="inline mr-2" />
                        (+91) 9993141322
                    </p>
                    <h2 className="text-2xl font-semibold mb-3 mt-6">Email</h2>
                    <p className="text-xl">
                        <AiOutlineMail size={24} className="inline mr-2" />
                        admin@mtbow.com
                    </p>
                </Col>
            </Row>
            <Divider />
            <h2 className="text-2xl font-semibold mb-3 text-center">Follow Us</h2>
            <Row gutter={16} justify="center">
                <Col>
                    <a href="https://instagram.com/play.mtbow?igshid=YmMyMTA2M2Y=" target="_blank" rel="noopener noreferrer">
                        <AiOutlineInstagram size={32} color="#dc5714" />
                    </a>
                </Col>
                <Col>
                    <a href="https://www.youtube.com/@MTBOW-Youtube_Fantasy_League" target="_blank" rel="noopener noreferrer">
                        <AiOutlineYoutube size={32} color="#dc5714" />
                    </a>
                </Col>
                <Col>
                    <a href="https://chat.whatsapp.com/Egqmis94D5EJ4dNYeaGovE" target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp size={32} color="#dc5714" />
                    </a>
                </Col>
            </Row>
        </div>
    );
};

export default Contact;
