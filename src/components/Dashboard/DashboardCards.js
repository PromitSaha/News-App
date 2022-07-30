import React, { useEffect, useState, useRef} from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { searchNews_Ajax } from '../../helpers/requests';
import { ResponseStatus, ArticleCategories } from '../../helpers/constants';
import { showLoadingSpinner, hideLoadingSpinner } from '../../redux/actions/loadingSpinner';

import { toggleFavouritesDrawer } from '../../redux/actions/news';
import { formatDateTime, isEmptyArray, onImageError } from '../../helpers/utils';
import No_Preview_available from "../../assets/images/No_preview_available.jpg";

// Material UI
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4
};

const favouritesStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "60%",
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const DashboardCards = () => {
    const dispatch = useDispatch();

    const searchString = useSelector(state => state?.news?.searchString);
    const isFavouritesDrawerOpen = useSelector(state => state?.news?.isFavouritesDrawerOpen);

    const [currentPage, setCurrentPage] = useState(1);
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [totalCount, setTotalCount] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const currentPageRef = useRef(null);

    useEffect(() => {
    }, [isFavouritesDrawerOpen]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    useEffect(() => {
        if(currentTab >= 0) {
            getNews();
        }
    }, [searchString, currentTab]);

    useEffect(() => {
        currentPageRef.current = currentPage;
        if(currentPage > 0) {
            getNews(articles);
        }
    }, [currentPage]);

    function handleTabChange(event, newValue) {
        setCurrentTab(newValue);
    };

    function prepareArticles(newsList, existingArticles) {
        if(newsList && Array.isArray(newsList) && newsList.length > 0) {
            var arr = [];
            if(existingArticles && Array.isArray(existingArticles) && existingArticles.length > 0) {
                arr = [...existingArticles];
            }

            newsList.map((item) => {
                if(item) {
                    var temp = Object.create(item);
                    temp.isFavourite = false;

                    arr.push(temp);
                }
            });

            setArticles(arr);
        }
    }

    function getNews(existingArticles) {
        if(currentPage && currentTab >= 0) {
            var params = {
                q: searchString,
                pageSize: 20,
                page: currentPage,
                category: ArticleCategories[currentTab].key
            };
            
            dispatch(showLoadingSpinner());
            searchNews_Ajax(params,
                function(response) {
                    dispatch(hideLoadingSpinner());
                    if(response && response.status == ResponseStatus.success && response.articles
                        && Array.isArray(response.articles) && response.articles.length) {
                        
                        prepareArticles(response.articles, existingArticles);
                        setTotalCount(response.totalResults);
                    }
                    else if(response && response.status == ResponseStatus.Failure && response.message) {
                        setArticles([]);
                        setTotalCount(0);
                        alert(response.message);
                    }
                },
                function(err) {
                    dispatch(hideLoadingSpinner());
                }
            );
        }
    }

    function handleScroll(event) {
        var node = event.target.scrollingElement;
        
        const bottom = node?.scrollHeight - node?.scrollTop === node?.clientHeight;
        if (bottom) {
            currentPageRef.current++;
            setCurrentPage(currentPageRef.current);
        }
    }

    function toggleFavouriteStatus(index) {
        var articleList = Object.create(articles);
        
        articleList[index].isFavourite = !articleList[index].isFavourite;
        setArticles(articleList);
    }

    function articleCardClicked(article) {
        setCurrentArticle(article);
        setTimeout(() => {
            handleOpen();
        }, 100);
    }

    function renderModal() {
        return (
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{ overflow:"scroll" }}
            >
                <Fade in={open}>
                    {
                        currentArticle ?
                        <Box sx={style}>
                            <Card>
                                <CardHeader
                                    title={
                                        <Typography>
                                            {currentArticle.title}
                                        </Typography>
                                    }
                                    subheader={formatDateTime(currentArticle.publishedAt)}
                                />
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={currentArticle.urlToImage ? currentArticle.urlToImage : No_Preview_available}
                                    alt="Paella dish"
                                    onError={onImageError}
                                />
                                <CardContent>
                                    <Typography variant="h6">
                                        {currentArticle.author}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {currentArticle.source.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {currentArticle.description}
                                    </Typography>
                                    <Button href={currentArticle.url}>
                                        Learn More
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                        :
                        <></>
                    }
                </Fade>
            </Modal>
        );
    }

    function renderFavouritesModal() {
        return (
            <Modal
                aria-labelledby="transition-modal-titl-2"
                aria-describedby="transition-modal-description-2"
                open={isFavouritesDrawerOpen}
                onClose={() => dispatch(toggleFavouritesDrawer())}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
                sx={{ overflow:"scroll", marginTop: "50px" }}
            >
                <Fade in={isFavouritesDrawerOpen}>
                    <Box sx={favouritesStyle}>
                        <Grid container spacing={2} sx={{ paddingTop: "50px" }}>
                        <Typography align="center" variant="h5" sx={{ width: "100%", marginBottom: "50px" }}>
                            Read Later        
                        </Typography>
                        <Divider sx={{ width: "100%", marginBottom: "50px" }} />
                        {
                            articles.map((article, index) => {
                                if(article.isFavourite) {
                                    return (
                                        <Grid key={index} item sm={6} xs={12} md={3}>
                                            <Card className="article-card">
                                                <CardHeader
                                                    className="article-card-header"
                                                    title={
                                                        <Typography>
                                                            {article.title}
                                                        </Typography>
                                                    }
                                                    subheader={formatDateTime(article.publishedAt)}
                                                    action={
                                                        <IconButton aria-label="settings" onClick={() => toggleFavouriteStatus(index)}>
                                                            {
                                                                article.isFavourite ?
                                                                <BookmarkIcon/>
                                                                :
                                                                <BookmarkBorderIcon/>
                                                            }
                                                        </IconButton>
                                                    }
                                                />
                                                <CardMedia
                                                    component="img"
                                                    height="194"
                                                    image={article.urlToImage ? article.urlToImage : No_Preview_available}
                                                    alt="Paella dish"
                                                    onClick={() => articleCardClicked(article)}
                                                    onError={onImageError}
                                                />
                                                <CardContent>
    
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )
                                }
                            })
                        }
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            {renderFavouritesModal()}
            <div className='article-list-box'>
                <Container>
                    <Tabs value={currentTab} onChange={handleTabChange} aria-label="disabled tabs example" variant="scrollable" scrollButtons={false}>
                        {
                            ArticleCategories && Array.isArray(ArticleCategories) && ArticleCategories.length > 0 &&
                            ArticleCategories.map((category, index) => {
                                return (
                                    <Tab key={index} label={category.value} />            
                                )
                            })
                        }
                    </Tabs>
                </Container>
                <Grid container spacing={2}>
                {
                    articles.map((article, index) => {
                        return (
                            <Grid key={index} item sm={6} xs={12} md={3}>
                                <Card className="article-card">
                                    <CardHeader
                                        className="article-card-header"
                                        title={
                                            <Typography>
                                                {article.title}
                                            </Typography>
                                        }
                                        subheader={formatDateTime(article.publishedAt)}
                                        action={
                                            <IconButton aria-label="settings" onClick={() => toggleFavouriteStatus(index)}>
                                                {
                                                    article.isFavourite ?
                                                    <BookmarkIcon/>
                                                    :
                                                    <BookmarkBorderIcon/>
                                                }
                                            </IconButton>
                                        }
                                    />
                                    <CardMedia
                                        component="img"
                                        height="194"
                                        image={article.urlToImage ? article.urlToImage : No_Preview_available}
                                        alt="Paella dish"
                                        onClick={() => articleCardClicked(article)}
                                        onError={onImageError}
                                    />
                                    <CardContent>

                                    </CardContent>
                                </Card>
                            </Grid>
                        )
                    })
                }
                </Grid>
            </div>
        </>
    )
}

export default DashboardCards;
