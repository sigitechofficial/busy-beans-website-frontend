import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import React from 'react';

const AccordionSection = ({ title, content }) => (
  <AccordionItem>
    <h2>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {content}
    </AccordionPanel>
  </AccordionItem>
);

const AccordionBean = ({ sections }) => {
  return (
    <div>
      <Accordion defaultIndex={[0]} allowMultiple>
        {sections?.map((section, index) => (
          <AccordionSection key={index} title={section.title} content={section.content} />
        ))}
      </Accordion>
    </div>
  );
};

export default AccordionBean;
